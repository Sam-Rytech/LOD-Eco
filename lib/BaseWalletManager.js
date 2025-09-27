import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { base } from '@reown/appkit/networks'
import { ethers } from 'ethers'

class BaseWalletManager {
  constructor() {
    this.appKit = null
    this.provider = null
    this.signer = null
    this.address = null
    this.contract = null
    this.isConnected = false

    // Event callbacks
    this.onConnect = null
    this.onDisconnect = null
    this.onAccountChange = null
  }

  /**
   * Initialize Reown AppKit for Base blockchain
   * @param {Object} config - Configuration object
   * @param {string} config.projectId - Reown Cloud project ID
   * @param {Object} config.metadata - App metadata
   */
  initializeAppKit(config = {}) {
    const {
      projectId = 'f579285fe2d1f128b9a30434426c3a6b',
      metadata = {
        name: 'Base DApp',
        description: 'DApp on Base blockchain',
        url: window.location.origin,
        icons: ['https://avatars.githubusercontent.com/u/179229932'],
      },
    } = config

    try {
      // Create Ethers adapter for Base
      const ethersAdapter = new EthersAdapter()

      // Initialize AppKit with Base network only
      this.appKit = createAppKit({
        adapters: [ethersAdapter],
        networks: [base], // Base blockchain only
        projectId,
        metadata,
        features: {
          analytics: true, // Optional: enable analytics
          email: false, // Disable email login
          socials: [], // Disable social logins
        },
      })

      this.setupEventListeners()
      console.log('Reown AppKit initialized for Base blockchain')

      return this.appKit
    } catch (error) {
      console.error('Failed to initialize AppKit:', error)
      throw error
    }
  }

  /**
   * Open wallet connect modal
   */
  async openModal() {
    if (!this.appKit) {
      throw new Error('AppKit not initialized. Call initializeAppKit() first.')
    }

    try {
      this.appKit.open()
    } catch (error) {
      console.error('Failed to open wallet modal:', error)
      throw error
    }
  }

  /**
   * Close wallet connect modal
   */
  closeModal() {
    if (this.appKit) {
      this.appKit.close()
    }
  }

  /**
   * Get connection status and account info
   */
  async getAccount() {
    if (!this.appKit) {
      throw new Error('AppKit not initialized.')
    }

    try {
      const account = this.appKit.getAccount()
      const isConnected = this.appKit.getIsConnected()

      if (isConnected && account) {
        this.address = account.address
        this.isConnected = true

        // Get provider and signer
        const walletProvider = this.appKit.getWalletProvider()
        this.provider = new ethers.providers.Web3Provider(walletProvider)
        this.signer = this.provider.getSigner()

        return {
          address: this.address,
          chainId: account.chainId,
          isConnected: this.isConnected,
        }
      }

      return { isConnected: false }
    } catch (error) {
      console.error('Failed to get account:', error)
      throw error
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnect() {
    if (!this.appKit) {
      throw new Error('AppKit not initialized.')
    }

    try {
      await this.appKit.disconnect()
      this.resetState()

      if (this.onDisconnect) {
        this.onDisconnect()
      }
    } catch (error) {
      console.error('Failed to disconnect:', error)
      throw error
    }
  }

  /**
   * Initialize contract instance
   * @param {string} contractAddress - Contract address on Base
   * @param {Array} contractABI - Contract ABI
   */
  initializeContract(contractAddress, contractABI) {
    if (!this.signer) {
      throw new Error('Wallet not connected. Connect wallet first.')
    }

    try {
      this.contract = new ethers.Contract(
        contractAddress,
        contractABI,
        this.signer
      )

      console.log('Contract initialized on Base:', contractAddress)
      return this.contract
    } catch (error) {
      console.error('Failed to initialize contract:', error)
      throw error
    }
  }

  /**
   * Call a read-only contract method
   * @param {string} methodName - Method name
   * @param {Array} params - Method parameters
   */
  async readContract(methodName, params = []) {
    if (!this.contract) {
      throw new Error(
        'Contract not initialized. Call initializeContract() first.'
      )
    }

    try {
      const result = await this.contract[methodName](...params)
      console.log(`Read ${methodName}:`, result)
      return result
    } catch (error) {
      console.error(`Failed to read ${methodName}:`, error)
      throw error
    }
  }

  /**
   * Send transaction to contract method
   * @param {string} methodName - Method name
   * @param {Array} params - Method parameters
   * @param {Object} options - Transaction options
   */
  async writeContract(methodName, params = [], options = {}) {
    if (!this.contract) {
      throw new Error(
        'Contract not initialized. Call initializeContract() first.'
      )
    }

    try {
      // Estimate gas if not provided
      if (!options.gasLimit) {
        const estimatedGas = await this.contract.estimateGas[methodName](
          ...params,
          {
            value: options.value || 0,
          }
        )
        options.gasLimit = estimatedGas.mul(120).div(100) // Add 20% buffer
      }

      const tx = await this.contract[methodName](...params, options)
      console.log('Transaction sent:', tx.hash)

      // Wait for confirmation
      const receipt = await tx.wait()
      console.log('Transaction confirmed:', receipt)

      return {
        hash: tx.hash,
        receipt: receipt,
      }
    } catch (error) {
      console.error(`Failed to execute ${methodName}:`, error)
      throw error
    }
  }

  /**
   * Get ETH balance on Base
   */
  async getEthBalance() {
    if (!this.signer) {
      throw new Error('Wallet not connected.')
    }

    try {
      const balance = await this.signer.getBalance()
      return ethers.utils.formatEther(balance)
    } catch (error) {
      console.error('Failed to get ETH balance:', error)
      throw error
    }
  }

  /**
   * Get ERC20 token balance on Base
   * @param {string} tokenAddress - Token contract address
   */
  async getTokenBalance(tokenAddress) {
    if (!this.signer) {
      throw new Error('Wallet not connected.')
    }

    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          'function balanceOf(address owner) view returns (uint256)',
          'function decimals() view returns (uint8)',
          'function symbol() view returns (string)',
        ],
        this.signer
      )

      const balance = await tokenContract.balanceOf(this.address)
      const decimals = await tokenContract.decimals()
      const symbol = await tokenContract.symbol()

      return {
        balance: ethers.utils.formatUnits(balance, decimals),
        symbol: symbol,
        decimals: decimals,
      }
    } catch (error) {
      console.error('Failed to get token balance:', error)
      throw error
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (!this.appKit) return

    // Listen for account changes
    this.appKit.subscribeAccount((account) => {
      console.log('Account changed:', account)

      if (account.isConnected) {
        this.address = account.address
        this.isConnected = true

        if (this.onConnect) {
          this.onConnect(account)
        }
      } else {
        this.resetState()
        if (this.onDisconnect) {
          this.onDisconnect()
        }
      }

      if (this.onAccountChange) {
        this.onAccountChange(account)
      }
    })
  }

  /**
   * Reset internal state
   */
  resetState() {
    this.provider = null
    this.signer = null
    this.address = null
    this.contract = null
    this.isConnected = false
  }

  /**
   * Get current connection state
   */
  getConnectionState() {
    return {
      isConnected: this.isConnected,
      address: this.address,
      hasContract: !!this.contract,
    }
  }
}

export const walletManager = new BaseWalletManager()