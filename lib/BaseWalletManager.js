'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { base } from '@reown/appkit/networks'
import { ethers } from 'ethers'

export default class BaseWalletManager {
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
   */
  initializeAppKit(config = {}) {
    const projectId =
      config.projectId || process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
    if (!projectId) throw new Error('No Reown project ID set!')

    const metadata = config.metadata || {
      name: 'FaucetLOD',
      description: 'Staking + Faucet dApp',
      url: window.location.origin,
      icons: ['https://localhost:3000/logo.svg'],
    }

    const ethersAdapter = new EthersAdapter()

    this.appKit = createAppKit({
      adapters: [ethersAdapter],
      networks: [base],
      projectId,
      metadata,
    })

    this.setupEventListeners()
    console.log('Reown AppKit initialized for Base blockchain')

    return this.appKit
  }

  /**
   * Open wallet modal
   */
  async openModal() {
    if (!this.appKit) throw new Error('AppKit not initialized.')
    try {
      this.appKit.open()
    } catch (error) {
      console.error('Failed to open wallet modal:', error)
      throw error
    }
  }

  /**
   * Close wallet modal
   */
  closeModal() {
    if (this.appKit) this.appKit.close()
  }

  /**
   * Get account and signer info
   */
  async getAccount() {
    if (!this.appKit) throw new Error('AppKit not initialized.')
    try {
      const account = this.appKit.getAccount()
      if (!account || !account.isConnected) return { isConnected: false }

      this.address = account.address
      this.isConnected = true

      const walletProvider = this.appKit.getWalletProvider()
      this.provider = new ethers.providers.Web3Provider(walletProvider)
      this.signer = this.provider.getSigner()

      return {
        address: this.address,
        chainId: account.chainId,
        isConnected: true,
      }
    } catch (error) {
      console.error('Failed to get account:', error)
      throw error
    }
  }

  /**
   * Initialize contract instance
   */
  initializeContract(contractAddress, contractABI) {
    if (!this.signer) throw new Error('Wallet not connected.')
    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.signer
    )
    console.log('Contract initialized:', contractAddress)
    return this.contract
  }

  /**
   * Read contract method
   */
  async readContract(methodName, params = []) {
    if (!this.contract) throw new Error('Contract not initialized.')
    try {
      const result = await this.contract[methodName](...params)
      return result
    } catch (error) {
      console.error(`Failed to read ${methodName}:`, error)
      throw error
    }
  }

  /**
   * Write contract method
   */
  async writeContract(methodName, params = [], options = {}) {
    if (!this.contract) throw new Error('Contract not initialized.')
    try {
      if (!options.gasLimit) {
        const estimatedGas = await this.contract.estimateGas[methodName](
          ...params,
          {
            value: options.value || 0,
          }
        )
        options.gasLimit = estimatedGas.mul(120).div(100) // 20% buffer
      }
      const tx = await this.contract[methodName](...params, options)
      const receipt = await tx.wait()
      return { hash: tx.hash, receipt }
    } catch (error) {
      console.error(`Failed to execute ${methodName}:`, error)
      throw error
    }
  }

  /**
   * Get ETH balance
   */
  async getEthBalance() {
    if (!this.signer) throw new Error('Wallet not connected.')
    const balance = await this.signer.getBalance()
    return ethers.utils.formatEther(balance)
  }

  /**
   * Get ERC20 token balance
   */
  async getTokenBalance(tokenAddress) {
    if (!this.signer) throw new Error('Wallet not connected.')
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
      symbol,
      decimals,
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnect() {
    if (!this.appKit) return
    try {
      await this.appKit.disconnect()
      this.resetState()
      if (this.onDisconnect) this.onDisconnect()
    } catch (error) {
      console.error('Failed to disconnect:', error)
      throw error
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (!this.appKit) return
    this.appKit.subscribeAccount((account) => {
      if (account.isConnected) {
        this.address = account.address
        this.isConnected = true
        if (this.onConnect) this.onConnect(account)
      } else {
        this.resetState()
        if (this.onDisconnect) this.onDisconnect()
      }
      if (this.onAccountChange) this.onAccountChange(account)
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
   * Current connection info
   */
  getConnectionState() {
    return {
      isConnected: this.isConnected,
      address: this.address,
      hasContract: !!this.contract,
    }
  }
}
