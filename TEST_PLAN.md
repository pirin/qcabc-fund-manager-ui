# QCABC Fund Manager UI - Comprehensive Test Plan

## Overview
This test plan covers manual testing for the QCABC Fund Manager UI, a decentralized fund management application built on Scaffold-ETH 2. The application allows users to deposit USDC tokens to receive fund shares and redeem shares for underlying assets.

## Testing Environment Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- MetaMask or compatible Web3 wallet installed
- Access to Base Sepolia testnet
- Test USDC tokens (available via faucet in testnet)

### Network Configuration
- **Primary Network**: Base Sepolia (Chain ID: 84532)
- **Contracts**: 
  - FundManager: `0xf5825641f46044b17105ec289b1e9bc10c044422`
  - ShareToken: `0x354f8a8e721a11908e8f19ee1156f3c5fdd9c012` 
  - MockUSDC: `0x7a07f915de2c36b4118f270ff8b18629a8f67377`
  - MembershipBadge: `0xa6ee8d3dbe03a58cfec8a6be94fb117fd1389b73`

### Application URLs
- **Development**: `http://localhost:3000` (after running `yarn dev`)
- **Production**: [Deployed Vercel URL]

## Test Categories

### 1. Wallet Connection Tests

#### TC-1.1: Initial Wallet Connection
**Objective**: Verify wallet connection functionality
**Steps**:
1. Navigate to the application homepage
2. Verify "ConnectWalletMessage" component is displayed when no wallet is connected
3. Click wallet connect button
4. Select MetaMask/preferred wallet
5. Approve connection request in wallet
6. Verify connected address is displayed in header
7. Verify network switcher shows current network

**Expected Results**:
- Connection prompt appears correctly
- Wallet connects successfully
- User address displayed in header component
- Network information is accurate

#### TC-1.2: Network Switching
**Objective**: Test network switching functionality
**Steps**:
1. Connect wallet on incorrect network
2. Verify network warning message appears
3. Click network switch button
4. Approve network switch in wallet
5. Verify application updates to correct network

**Expected Results**:
- Network mismatch detected and displayed
- Network switching works correctly
- Application state updates after network change

#### TC-1.3: Wallet Disconnection
**Objective**: Test wallet disconnection
**Steps**:
1. Connect wallet successfully
2. Disconnect wallet from browser extension
3. Refresh page
4. Verify ConnectWalletMessage appears
5. Verify no user-specific data is displayed

**Expected Results**:
- Application detects disconnection
- Returns to initial connection state
- No residual user data displayed

### 2. Membership Badge Tests

#### TC-2.1: Valid Membership Badge
**Objective**: Verify membership badge validation for authorized users
**Steps**:
1. Connect with wallet that has valid membership badge
2. Verify no membership warnings displayed
3. Verify deposit functionality is enabled
4. Check that deposit button is not disabled due to membership

**Expected Results**:
- No membership error messages
- Deposit functionality accessible
- Normal user interface displayed

#### TC-2.2: Invalid/Missing Membership Badge
**Objective**: Test behavior with invalid/missing membership
**Steps**:
1. Connect with wallet without membership badge
2. Verify membership warning message appears
3. Attempt to use deposit functionality
4. Verify deposit is blocked
5. Check message text accuracy

**Expected Results**:
- Clear warning message about membership requirement
- Deposit functionality disabled
- Appropriate error message displayed

#### TC-2.3: Deactivated Membership Badge
**Objective**: Test behavior with deactivated badge
**Steps**:
1. Connect with wallet that has deactivated membership
2. Verify specific deactivation message appears
3. Confirm contact information is provided
4. Verify deposit is blocked

**Expected Results**:
- Specific deactivation message displayed
- Contact instructions provided
- Functionality appropriately restricted

### 3. Token Acquisition Tests

#### TC-3.1: No USDC Tokens - Testnet
**Objective**: Test faucet functionality on testnet
**Steps**:
1. Connect wallet with 0 USDC balance on Base Sepolia
2. Navigate to deposit section
3. Verify "NoDepositTokensMessage" component appears
4. Click "Get USDC Tokens" button
5. Approve transaction in wallet
6. Wait for transaction confirmation
7. Verify balance updates

**Expected Results**:
- No tokens message displayed correctly
- Faucet button works
- Tokens minted successfully (1000 USDC)
- Balance updates in UI

#### TC-3.2: No USDC Tokens - Mainnet
**Objective**: Test external link for mainnet token acquisition
**Steps**:
1. Switch to Base mainnet (if available)
2. Connect wallet with 0 USDC balance
3. Verify external link to Uniswap appears
4. Click "Get USDC Tokens" link
5. Verify Uniswap opens in new tab with correct parameters

**Expected Results**:
- External link displayed for mainnet
- Link opens Uniswap with correct swap configuration
- Link includes proper referral parameters

### 4. Fund Deposit Tests

#### TC-4.1: Basic Deposit Flow
**Objective**: Test standard deposit functionality
**Steps**:
1. Ensure wallet has USDC tokens and valid membership
2. Navigate to deposit section
3. Enter deposit amount (e.g., 100 USDC)
4. Click "Max" button to test auto-fill
5. Verify amount validation (minimum 1 USDC)
6. Click "Approve" button (if approval needed)
7. Approve USDC spending in wallet
8. Click "Deposit" button after approval
9. Confirm deposit transaction in wallet
10. Wait for transaction confirmation
11. Verify share tokens received
12. Check balance updates

**Expected Results**:
- Amount validation works correctly
- Max button fills correct amount
- Two-step process (approve + deposit) works on non-EIP5792 wallets
- Share tokens minted correctly
- Balances update in real-time
- Transaction appears in history

#### TC-4.2: EIP-5792 Batch Transaction
**Objective**: Test batch approve+deposit for EIP5792 compatible wallets
**Steps**:
1. Connect EIP-5792 compatible wallet (e.g., Coinbase Wallet)
2. Enter deposit amount
3. Click "Deposit Funds" button (single step)
4. Approve batch transaction in wallet
5. Wait for transaction confirmation
6. Verify both approval and deposit completed

**Expected Results**:
- Single button for EIP-5792 wallets
- Batch transaction executes successfully
- Both approval and deposit complete atomically
- Balances update correctly

#### TC-4.3: Deposit Validation Tests
**Objective**: Test input validation and error handling
**Steps**:
1. Test deposit amounts:
   - 0 USDC (should be blocked)
   - 0.5 USDC (should be blocked - minimum 1)
   - Amount exceeding balance (should show error)
   - Valid amounts (should work)
2. Test with insufficient gas
3. Test transaction rejection
4. Test network disconnection during transaction

**Expected Results**:
- Appropriate error messages for invalid inputs
- Transaction failures handled gracefully
- User feedback provided for all error states
- No partial state updates on failures

### 5. Fund Redemption Tests

#### TC-5.1: Basic Redemption Flow
**Objective**: Test share redemption functionality
**Steps**:
1. Ensure wallet has share tokens
2. Verify redemptions are enabled (`redemptionsAllowed = true`)
3. Navigate to redemption section
4. Enter share amount to redeem
5. Click "Max" button to test auto-fill
6. Click "Redeem Shares" button
7. Confirm transaction in wallet
8. Wait for confirmation
9. Verify USDC tokens received
10. Check balance updates

**Expected Results**:
- Redemption section visible when redemptions enabled
- Share amount validation works
- Max button fills correct amount
- Shares burned and USDC received
- Balances update correctly
- Transaction appears in history

#### TC-5.2: Redemptions Paused
**Objective**: Test behavior when redemptions are paused
**Steps**:
1. Connect wallet with share tokens
2. Verify redemptions are disabled (`redemptionsAllowed = false`)
3. Confirm redemption section is hidden
4. Verify informational message about quarterly redemption periods
5. Test link to help documentation

**Expected Results**:
- Redemption UI not displayed when paused
- Clear message about quarterly redemption periods
- Help link works correctly
- No redemption attempts possible

#### TC-5.3: Redemption Validation
**Objective**: Test redemption input validation
**Steps**:
1. Test redemption amounts:
   - 0 shares (should be blocked)
   - Amount exceeding owned shares (should show error)
   - Valid amounts (should work)
2. Test without membership badge
3. Test transaction failures

**Expected Results**:
- Validation errors displayed appropriately
- Membership requirements enforced
- Error handling works correctly

### 6. Portfolio and Statistics Tests

#### TC-6.1: Fund Statistics Display
**Objective**: Verify fund statistics are displayed correctly
**Steps**:
1. Navigate to homepage
2. Verify fund statistics section displays:
   - Current share price
   - Total fund shares
   - Fund total value
   - Fund portfolio value
   - Fund treasury balance
3. Check timestamp of last portfolio update
4. Verify currency formatting
5. Test data refresh on transactions

**Expected Results**:
- All statistics display with proper formatting
- Timestamp shows "updated X time ago"
- Values update after transactions
- Currency symbols display correctly

#### TC-6.2: Transaction History
**Objective**: Test shareholder transaction history
**Steps**:
1. Connect wallet that has transaction history
2. Scroll to transaction history section
3. Verify deposit transactions display correctly:
   - Date formatting
   - Amount deposited
   - Shares received
   - Share price at time of deposit
   - Transaction hash link
4. Verify redemption transactions (if any)
5. Test transaction hash links

**Expected Results**:
- Transaction history displays in chronological order
- All transaction details accurate
- Transaction hash links work
- Icons differentiate deposits vs redemptions
- Share price calculations correct

#### TC-6.3: No Transaction History
**Objective**: Test display for users with no history
**Steps**:
1. Connect wallet with no transaction history
2. Verify transaction section is hidden
3. Perform a deposit
4. Verify transaction history appears

**Expected Results**:
- No history section hidden initially
- Section appears after first transaction
- First transaction displayed correctly

### 7. API and Data Integration Tests

#### TC-7.1: Portfolio Oracle Updates
**Objective**: Test portfolio value updates from oracle
**Steps**:
1. Monitor portfolio value in statistics
2. Call portfolio update API endpoint (if accessible)
3. Verify values update in UI
4. Check timestamp updates
5. Test stale data handling

**Expected Results**:
- Portfolio values update from oracle
- Timestamps reflect actual update time
- Stale data rejected appropriately

#### TC-7.2: The Graph Integration
**Objective**: Test GraphQL data fetching
**Steps**:
1. Perform deposit/redemption transactions
2. Wait for The Graph indexing
3. Verify transaction data appears correctly
4. Test data refresh mechanisms
5. Check error handling for Graph unavailability

**Expected Results**:
- Transaction data indexed correctly
- Historical data loads properly
- Graceful handling of indexing delays
- Error states handled appropriately

### 8. Responsive Design Tests

#### TC-8.1: Mobile Responsiveness
**Objective**: Test application on mobile devices
**Steps**:
1. Access application on mobile device/emulator
2. Test wallet connection on mobile
3. Navigate through all sections
4. Test deposit/redemption flows
5. Verify input fields work correctly
6. Check button sizes and accessibility

**Expected Results**:
- Application responsive on mobile
- All functionality accessible
- Input fields properly sized
- Buttons easily tappable
- No horizontal scrolling required

#### TC-8.2: Tablet and Desktop
**Objective**: Test various screen sizes
**Steps**:
1. Test on tablet-sized screens
2. Test on various desktop resolutions
3. Verify layout adapts correctly
4. Check component alignment
5. Test multi-column layouts

**Expected Results**:
- Layout adapts to screen size
- Components remain properly aligned
- No layout breaks at any resolution

### 9. Error Handling and Edge Cases

#### TC-9.1: Network Errors
**Objective**: Test handling of network issues
**Steps**:
1. Disconnect internet during transaction
2. Test RPC endpoint failures
3. Simulate timeout scenarios
4. Test recovery after reconnection

**Expected Results**:
- Appropriate error messages displayed
- Application recovers gracefully
- No corrupted state after errors
- User can retry operations

#### TC-9.2: Blockchain State Changes
**Objective**: Test handling of external state changes
**Steps**:
1. Change account balances externally
2. Modify contract state from another interface
3. Test concurrent user operations
4. Verify data consistency

**Expected Results**:
- Application detects state changes
- Data refreshes appropriately
- Concurrent operations handled correctly

#### TC-9.3: Invalid Inputs and Edge Cases
**Objective**: Test extreme and invalid inputs
**Steps**:
1. Test very large numbers
2. Test special characters in inputs
3. Test rapid clicking of buttons
4. Test browser back/forward navigation
5. Test page refresh during operations

**Expected Results**:
- Invalid inputs handled gracefully
- No crashes from extreme inputs
- Navigation works correctly
- Page refreshes don't corrupt state

### 10. Performance Tests

#### TC-10.1: Load Time Performance
**Objective**: Test application loading performance
**Steps**:
1. Measure initial page load time
2. Test wallet connection speed
3. Monitor transaction confirmation times
4. Check component render performance

**Expected Results**:
- Page loads within acceptable time (< 3 seconds)
- Wallet connection responsive
- UI remains responsive during operations

#### TC-10.2: Memory Usage
**Objective**: Monitor resource usage
**Steps**:
1. Use browser dev tools to monitor memory
2. Test extended usage sessions
3. Check for memory leaks
4. Monitor after multiple transactions

**Expected Results**:
- Memory usage remains stable
- No significant memory leaks
- Performance doesn't degrade over time

### 11. Security Tests

#### TC-11.1: Transaction Security
**Objective**: Verify transaction security
**Steps**:
1. Verify transaction data before signing
2. Check allowance amounts
3. Validate recipient addresses
4. Test transaction replay protection

**Expected Results**:
- Transaction parameters correct
- Allowances set to exact amounts needed
- Proper recipient validation
- No replay vulnerabilities

#### TC-11.2: Input Sanitization
**Objective**: Test input handling security
**Steps**:
1. Test XSS attempts in input fields
2. Test SQL injection attempts
3. Verify proper data encoding
4. Test URL parameter manipulation

**Expected Results**:
- All inputs properly sanitized
- No XSS vulnerabilities
- Data properly encoded
- URL manipulation handled safely

## Test Execution Guidelines

### Test Environment Preparation
1. Set up clean browser profile
2. Install MetaMask with test accounts
3. Acquire test tokens
4. Configure network settings
5. Clear browser cache between test runs

### Test Data Management
- Use dedicated test wallets
- Maintain test token balances
- Document test transactions
- Reset state between major test runs

### Reporting
- Document all bugs with screenshots
- Include transaction hashes for blockchain operations
- Note browser and wallet versions
- Record network conditions during testing

### Critical Path Testing
Focus on these high-priority flows:
1. Wallet connection and membership validation
2. Token acquisition (faucet)
3. Complete deposit flow (approve + deposit)
4. Share redemption (when enabled)
5. Real-time balance updates
6. Transaction history accuracy

## Test Schedule
- **Daily**: Critical path smoke tests
- **Weekly**: Full regression testing
- **Pre-deployment**: Complete test suite execution
- **Post-deployment**: Production verification tests

## Success Criteria
- All critical path tests pass
- No security vulnerabilities found
- Performance meets benchmarks
- Error handling works correctly
- User experience is smooth and intuitive
- All blockchain interactions function properly