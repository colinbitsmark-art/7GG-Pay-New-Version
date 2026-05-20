export const tickers = [
  { pair: "BTC/USD", price: "104,820.40", change: "+2.18%" },
  { pair: "USDT/USD", price: "1.0002", change: "+0.01%" },
  { pair: "USD/HKD", price: "7.8121", change: "-0.04%" },
  { pair: "USDT/CAD", price: "1.3684", change: "+0.12%" }
];

export const volumeData = [
  { month: "Jan", payIn: 820000, payOut: 620000, swap: 240000 },
  { month: "Feb", payIn: 940000, payOut: 760000, swap: 310000 },
  { month: "Mar", payIn: 1120000, payOut: 840000, swap: 420000 },
  { month: "Apr", payIn: 1380000, payOut: 960000, swap: 520000 },
  { month: "May", payIn: 1620000, payOut: 1240000, swap: 680000 },
  { month: "Jun", payIn: 1850000, payOut: 1410000, swap: 730000 }
];

export const allocationData = [
  { name: "USD", value: 42 },
  { name: "USDT", value: 24 },
  { name: "HKD", value: 14 },
  { name: "BTC", value: 11 },
  { name: "Other", value: 9 }
];

export const recentTransactions = [
  { id: "TX-90018", type: "Pay-in", asset: "USD", amount: "+42,800.00", status: "Paid", date: "17 May 2026" },
  { id: "TX-90017", type: "FX Swap", asset: "USDT/USD", amount: "18,400.00", status: "Completed", date: "17 May 2026" },
  { id: "TX-90016", type: "Pay-out", asset: "HKD", amount: "-76,120.00", status: "Pending", date: "16 May 2026" },
  { id: "TX-90015", type: "Deposit", asset: "BTC", amount: "+0.8412", status: "Completed", date: "16 May 2026" },
  { id: "TX-90014", type: "Pay-in", asset: "EUR", amount: "+22,900.00", status: "Paid", date: "15 May 2026" }
];

export const fiatWallets = [
  { asset: "USD", name: "US Dollar", balance: "1,284,500.00", usd: "$1,284,500", trend: "+8.4%" },
  { asset: "CAD", name: "Canadian Dollar", balance: "340,280.20", usd: "$248,650", trend: "+3.1%" },
  { asset: "HKD", name: "Hong Kong Dollar", balance: "5,820,500.00", usd: "$745,052", trend: "+5.6%" },
  { asset: "EUR", name: "Euro", balance: "192,840.45", usd: "$208,267", trend: "+2.2%" },
  { asset: "GBP", name: "British Pound", balance: "88,920.10", usd: "$112,430", trend: "-0.8%" }
];

export const cryptoWallets = [
  { asset: "BTC", name: "Bitcoin", balance: "18.4821", usd: "$1,938,412", network: "Bitcoin" },
  { asset: "ETH", name: "Ethereum", balance: "420.8820", usd: "$1,284,940", network: "Ethereum" },
  { asset: "USDT", name: "Tether", balance: "2,840,500.00", usd: "$2,841,068", network: "TRON / Ethereum" },
  { asset: "USDC", name: "USD Coin", balance: "980,240.00", usd: "$980,044", network: "Ethereum / Polygon" }
];

export const walletTransactions = [
  { asset: "USDT", txid: "0x9f2c...41aa", amount: "+120,000.00", status: "Confirmed", date: "17 May 2026" },
  { asset: "USD", txid: "ACH-882719", amount: "+85,500.00", status: "Settled", date: "17 May 2026" },
  { asset: "BTC", txid: "b6a3...fa90", amount: "-0.4200", status: "Broadcast", date: "16 May 2026" },
  { asset: "HKD", txid: "FPS-103882", amount: "-320,000.00", status: "Pending", date: "16 May 2026" }
];

export const paymentOrders = [
  { order: "PO-10491", customer: "Northstar Trading", method: "Card", amount: "$24,880.00", status: "Paid", created: "17 May 2026" },
  { order: "PO-10490", customer: "Omni D2C", method: "USDT", amount: "$18,400.00", status: "Pending", created: "17 May 2026" },
  { order: "PO-10489", customer: "Atlas Web3 Labs", method: "Bank Transfer", amount: "$92,100.00", status: "Failed", created: "16 May 2026" },
  { order: "PO-10488", customer: "Harbor Goods", method: "Checkout", amount: "$8,920.00", status: "Expired", created: "16 May 2026" }
];

export const payouts = [
  { beneficiary: "Apex Logistics", rail: "SWIFT", amount: "$42,000.00", status: "Processing", eta: "T+1" },
  { beneficiary: "Delta Export Ltd", rail: "FPS", amount: "HK$210,000.00", status: "Sent", eta: "Instant" },
  { beneficiary: "Blue Harbor OTC", rail: "USDT TRC20", amount: "78,000.00 USDT", status: "Review", eta: "15 min" }
];

export const swaps = [
  { id: "SW-70021", sell: "50,000 USDT", buy: "49,950 USD", rate: "0.9990", status: "Completed" },
  { id: "SW-70020", sell: "240,000 HKD", buy: "30,720 USD", rate: "0.1280", status: "Completed" },
  { id: "SW-70019", sell: "12.5 BTC", buy: "1,310,255 USDT", rate: "104,820.40", status: "Settled" }
];

export const apiKeys = [
  { name: "Production Checkout", prefix: "pk_live_7gg_8F2", created: "02 May 2026", scope: "Pay-in, Webhooks" },
  { name: "Treasury Sandbox", prefix: "sk_test_7gg_B91", created: "24 Apr 2026", scope: "Wallet, FX Swap" },
  { name: "ERP Connector", prefix: "sk_live_7gg_Z10", created: "11 Apr 2026", scope: "Transactions" }
];

export const teamMembers = [
  { name: "Maya Chen", role: "Owner", email: "maya@merchant.example", status: "Active" },
  { name: "Daniel Wong", role: "Finance", email: "daniel@merchant.example", status: "Active" },
  { name: "Ava Patel", role: "Developer", email: "ava@merchant.example", status: "Invited" }
];

export const riskAlertData = [
  { day: "Mon", low: 18, medium: 7, high: 2 },
  { day: "Tue", low: 22, medium: 9, high: 3 },
  { day: "Wed", low: 17, medium: 11, high: 4 },
  { day: "Thu", low: 28, medium: 13, high: 5 },
  { day: "Fri", low: 24, medium: 15, high: 6 },
  { day: "Sat", low: 15, medium: 8, high: 2 },
  { day: "Sun", low: 20, medium: 10, high: 3 }
];

export const complianceStats = [
  { name: "Approved", value: 62 },
  { name: "Pending", value: 24 },
  { name: "Escalated", value: 9 },
  { name: "Rejected", value: 5 }
];

export const complianceQueue = [
  { caseId: "KYB-3019", business: "Orbit Commerce HK", type: "KYB", risk: "Medium", status: "Enhanced Review" },
  { caseId: "TXM-8842", business: "Silverline OTC", type: "Transaction", risk: "High", status: "Analyst Assigned" },
  { caseId: "KYB-3018", business: "Maple Crossborder", type: "KYB", risk: "Low", status: "Document Check" }
];

export const applicants = [
  { name: "Orbit Commerce HK", country: "Hong Kong", submitted: "17 May 2026", risk: "Medium", status: "Pending" },
  { name: "Blue Harbor OTC", country: "Canada", submitted: "16 May 2026", risk: "High", status: "EDD Required" },
  { name: "Velvet D2C Group", country: "United Kingdom", submitted: "15 May 2026", risk: "Low", status: "Ready" },
  { name: "Atlas Web3 Labs", country: "Singapore", submitted: "14 May 2026", risk: "Medium", status: "Pending" }
];

export const suspiciousTransactions = [
  { id: "TX-90110", customer: "Blue Harbor OTC", route: "USDT TRC20 -> CAD", amount: "$180,000", score: 88, status: "Blocked" },
  { id: "TX-90104", customer: "Orbit Commerce HK", route: "HKD -> USDT", amount: "$72,400", score: 71, status: "Review" },
  { id: "TX-90098", customer: "Maple Crossborder", route: "USD -> EUR", amount: "$42,800", score: 54, status: "Watching" }
];

export const alerts = [
  { title: "Velocity threshold exceeded", severity: "High", entity: "Blue Harbor OTC", status: "Action Required" },
  { title: "Beneficiary name mismatch", severity: "Medium", entity: "Apex Logistics", status: "Open" },
  { title: "Webhook delivery failures", severity: "Low", entity: "Omni D2C", status: "Monitoring" }
];

export const userWalletAddresses = [
  {
    id: "ADDR-USDT-001",
    asset: "USDT",
    network: "TRON",
    address: "TQp7GG9x4a8pMockMerchantA1",
    walletType: "Main Wallet",
    destinationWallet: "Treasury Main TRC20",
    riskPolicy: "Auto sweep after AML pass",
    status: "Active"
  },
  {
    id: "ADDR-USDC-002",
    asset: "USDC",
    network: "Ethereum",
    address: "0x7ggPayMockMerchantUSDC002",
    walletType: "Main Wallet",
    destinationWallet: "Treasury Main ERC20",
    riskPolicy: "Manual review above threshold",
    status: "Active"
  },
  {
    id: "ADDR-BTC-003",
    asset: "BTC",
    network: "Bitcoin",
    address: "bc1q7ggpaymockmerchantbtc003",
    walletType: "Isolation Wallet",
    destinationWallet: "Quarantine BTC Vault",
    riskPolicy: "Hold until compliance clears",
    status: "Compliance Review"
  }
];

export const deposits = [
  {
    id: "DEP-240518-001",
    asset: "USDT",
    network: "TRON",
    amount: "84,200.00",
    source: "TLa2...9x41",
    txid: "7c9e...11a8",
    riskScore: 18,
    amlStatus: "Passed",
    walletStatus: "Swept",
    creditStatus: "Credited",
    destinationWallet: "Main Wallet",
    receivedAt: "18 May 2026 10:42"
  },
  {
    id: "DEP-240518-002",
    asset: "USDC",
    network: "Ethereum",
    amount: "126,800.00",
    source: "0x2A91...8F10",
    txid: "0xa84c...22fb",
    riskScore: 42,
    amlStatus: "Passed",
    walletStatus: "Pending Sweep",
    creditStatus: "Compliance Review",
    destinationWallet: "Main Wallet",
    receivedAt: "18 May 2026 11:08"
  },
  {
    id: "DEP-240518-003",
    asset: "BTC",
    network: "Bitcoin",
    amount: "0.8421",
    source: "bc1q...3j8s",
    txid: "b6a3...fa90",
    riskScore: 87,
    amlStatus: "High Risk Hit",
    walletStatus: "Isolated",
    creditStatus: "Compliance Review",
    destinationWallet: "Isolation Wallet",
    receivedAt: "18 May 2026 11:27"
  },
  {
    id: "DEP-240517-004",
    asset: "ETH",
    network: "Ethereum",
    amount: "52.4000",
    source: "0x91AC...4D70",
    txid: "0x44be...19c1",
    riskScore: 58,
    amlStatus: "Manual Review",
    walletStatus: "Isolated",
    creditStatus: "Counterparty Review",
    destinationWallet: "Isolation Wallet",
    receivedAt: "17 May 2026 16:34"
  }
];

export const amlScreenings = [
  { id: "AML-7710", depositId: "DEP-240518-001", provider: "Mock AML Graph", result: "Clear", riskScore: 18, matchedCategory: "No material exposure", analyst: "Auto" },
  { id: "AML-7711", depositId: "DEP-240518-002", provider: "Mock AML Graph", result: "Clear", riskScore: 42, matchedCategory: "Exchange cluster", analyst: "Auto" },
  { id: "AML-7712", depositId: "DEP-240518-003", provider: "Mock AML Graph", result: "Potential match", riskScore: 87, matchedCategory: "Sanctions adjacency", analyst: "Maya Chen" },
  { id: "AML-7713", depositId: "DEP-240517-004", provider: "Mock AML Graph", result: "Manual Review", riskScore: 58, matchedCategory: "Mixer proximity", analyst: "Daniel Wong" }
];

export const sweepTransactions = [
  { id: "SWP-9901", depositId: "DEP-240518-001", asset: "USDT", from: "Dedicated Deposit Address", to: "Main Wallet", amount: "84,200.00", status: "Swept", eta: "Completed", fee: "1.20 USDT" },
  { id: "SWP-9902", depositId: "DEP-240518-002", asset: "USDC", from: "Dedicated Deposit Address", to: "Main Wallet", amount: "126,800.00", status: "Queued", eta: "After AML hold", fee: "4.80 USDC" },
  { id: "SWP-9903", depositId: "DEP-240518-003", asset: "BTC", from: "Dedicated Deposit Address", to: "Isolation Wallet", amount: "0.8421", status: "Isolated", eta: "Compliance Review", fee: "0.00018 BTC" },
  { id: "SWP-9904", depositId: "DEP-240517-004", asset: "ETH", from: "Dedicated Deposit Address", to: "Isolation Wallet", amount: "52.4000", status: "Manual Review", eta: "Analyst Assigned", fee: "0.004 ETH" }
];

export const complianceCases = [
  { caseId: "CRC-5012", depositId: "DEP-240518-003", account: "Blue Harbor OTC", type: "AML Screening", risk: "High", status: "Analyst Assigned", reviewer: "Maya Chen", sla: "02:14:08" },
  { caseId: "CRC-5011", depositId: "DEP-240517-004", account: "Atlas Web3 Labs", type: "Wallet Risk Isolation", risk: "Medium", status: "Counterparty Review", reviewer: "Daniel Wong", sla: "05:48:21" },
  { caseId: "CRC-5010", depositId: "DEP-240518-002", account: "Orbit Commerce HK", type: "Treasury Sweep", risk: "Low", status: "Queued", reviewer: "Auto", sla: "00:38:40" }
];

export const walletIsolationEvents = [
  { id: "ISO-9103", depositId: "DEP-240518-003", wallet: "Quarantine BTC Vault", asset: "BTC", amount: "0.8421", riskScore: 87, reason: "Sanctions adjacency", status: "Isolated", nextAction: "Escalate AML Case" },
  { id: "ISO-9102", depositId: "DEP-240517-004", wallet: "Quarantine ETH Vault", asset: "ETH", amount: "52.4000", riskScore: 58, reason: "Mixer proximity", status: "Manual Review", nextAction: "Keep isolated" },
  { id: "ISO-9101", depositId: "DEP-240516-009", wallet: "Quarantine USDT Vault", asset: "USDT", amount: "42,000.00", riskScore: 33, reason: "Analyst released", status: "Credited", nextAction: "Release to Main Wallet" }
];

export const fiatDepositInstructions = {
  USD: {
    beneficiaryName: "7GG Pay Client Money Account - USD",
    bankName: "Mock First International Bank",
    bankAddress: "88 Queen's Road Central, Hong Kong",
    accountNumber: "742-880-991028",
    swift: "MFIBHKHHXXX",
    referenceCode: "7GG-USD-MER-1042",
    rails: "Wire transfer / ACH",
    arrival: "Same day to T+1",
    fee: "0.10%, minimum $8.00",
    compliance: "Use only your own verified personal or business bank account."
  },
  CAD: {
    beneficiaryName: "7GG Pay Client Money Account - CAD",
    bankName: "Mock Northern Trust Bank",
    bankAddress: "100 King Street West, Toronto, Canada",
    accountNumber: "Transit 001 / Account 8829012",
    swift: "MNTBCATTXXX",
    referenceCode: "7GG-CAD-MER-1042",
    rails: "Wire transfer / EFT",
    arrival: "T+1 to T+2",
    fee: "0.12%, minimum C$10.00",
    compliance: "Deposits from third-party accounts may be rejected or held for review."
  },
  HKD: {
    beneficiaryName: "7GG Pay Client Money Account - HKD",
    bankName: "Mock Asia Commercial Bank",
    bankAddress: "2 Finance Street, Central, Hong Kong",
    accountNumber: "024-782-991008",
    swift: "MACBHKHHXXX",
    referenceCode: "7GG-HKD-MER-1042",
    rails: "FPS / CHATS / Wire transfer",
    arrival: "Instant to same day",
    fee: "HK$15 local clearing / 0.08% wire",
    compliance: "Use only a bank account under the verified merchant name."
  },
  EUR: {
    beneficiaryName: "7GG Pay Client Money Account - EUR",
    bankName: "Mock Euro Settlement Bank",
    bankAddress: "Unter den Linden 20, Berlin, Germany",
    accountNumber: "DE89 3704 0044 0532 0130 00",
    swift: "MESBDEFFXXX",
    referenceCode: "7GG-EUR-MER-1042",
    rails: "SEPA / SWIFT",
    arrival: "SEPA same day, SWIFT T+1",
    fee: "EUR 2.50 SEPA / 0.10% SWIFT",
    compliance: "Reference code must be included to avoid delayed reconciliation."
  },
  GBP: {
    beneficiaryName: "7GG Pay Client Money Account - GBP",
    bankName: "Mock Sterling Business Bank",
    bankAddress: "25 Old Broad Street, London, United Kingdom",
    accountNumber: "Sort 04-00-04 / Account 88201991",
    swift: "MSBBGB2LXXX",
    referenceCode: "7GG-GBP-MER-1042",
    rails: "Faster Payments / CHAPS / SWIFT",
    arrival: "Instant to T+1",
    fee: "GBP 1.50 local / 0.10% wire",
    compliance: "Funds are reviewed before crediting to your available balance."
  }
};

export const cryptoDepositOptions = {
  BTC: {
    networks: ["Bitcoin"],
    addresses: { Bitcoin: "bc1q7ggpaymockmerchantbtc003" },
    minDeposit: "0.0005 BTC",
    confirmations: "3 confirmations"
  },
  ETH: {
    networks: ["Ethereum"],
    addresses: { Ethereum: "0x7GGPayMockMerchantETH004" },
    minDeposit: "0.01 ETH",
    confirmations: "12 confirmations"
  },
  USDT: {
    networks: ["TRON", "Ethereum"],
    addresses: {
      TRON: "TQp7GG9x4a8pMockMerchantA1",
      Ethereum: "0x7GGPayMockMerchantUSDTETH001"
    },
    minDeposit: "20 USDT",
    confirmations: "TRON 20 blocks / Ethereum 12 confirmations"
  },
  USDC: {
    networks: ["Ethereum", "Polygon"],
    addresses: {
      Ethereum: "0x7ggPayMockMerchantUSDC002",
      Polygon: "0x7GGPayMockMerchantUSDCPolygon002"
    },
    minDeposit: "20 USDC",
    confirmations: "Ethereum 12 confirmations / Polygon 128 blocks"
  }
};

export const transactionDetails = {
  "0x9f2c...41aa": {
    id: "TX-CRYPTO-7710",
    type: "Crypto Deposit",
    asset: "USDT",
    network: "TRON",
    amount: "+120,000.00",
    fee: "1.20 USDT",
    status: "Confirmed",
    reference: "0x9f2c...41aa",
    amlRiskScore: 18,
    timeline: ["Deposit Detected", "Confirming", "AML Screening", "Cleared", "Credited"],
    rawPayload: { chain: "TRON", confirmations: 24, risk: "LOW", destination: "Master Wallet" }
  },
  "ACH-882719": {
    id: "TX-FIAT-882719",
    type: "Fiat Deposit",
    asset: "USD",
    network: "ACH",
    amount: "+85,500.00",
    fee: "$8.00",
    status: "Settled",
    reference: "ACH-882719",
    amlRiskScore: 12,
    timeline: ["Deposit instruction created", "Bank transfer detected", "Compliance review", "Settled"],
    rawPayload: { rail: "ACH", referenceCode: "7GG-USD-MER-1042", source: "Verified business account" }
  },
  "b6a3...fa90": {
    id: "TX-CRYPTO-7712",
    type: "Crypto Withdrawal",
    asset: "BTC",
    network: "Bitcoin",
    amount: "-0.4200",
    fee: "0.00018 BTC",
    status: "Broadcast",
    reference: "b6a3...fa90",
    amlRiskScore: 54,
    timeline: ["Withdrawal submitted", "Compliance Checking", "Approved", "Broadcast"],
    rawPayload: { chain: "Bitcoin", approvalPolicy: "2 approvers", destination: "bc1q...external" }
  },
  "FPS-103882": {
    id: "TX-FIAT-103882",
    type: "Fiat Withdrawal",
    asset: "HKD",
    network: "FPS",
    amount: "-320,000.00",
    fee: "HK$15.00",
    status: "Pending",
    reference: "FPS-103882",
    amlRiskScore: 31,
    timeline: ["Withdrawal submitted", "Pending Approval", "Compliance Checking"],
    rawPayload: { rail: "FPS", beneficiary: "Apex Logistics", eta: "Instant after approval" }
  }
};

export const mockRiskDeposits = [
  {
    id: "RISK-LOW-001",
    asset: "USDT",
    amount: "84,200.00",
    sourceAddress: "TLa2...9x41",
    riskScore: 18,
    riskLabel: "Low",
    action: "Cleared",
    status: "Credited"
  },
  {
    id: "RISK-MED-002",
    asset: "ETH",
    amount: "52.4000",
    sourceAddress: "0x91AC...4D70",
    riskScore: 58,
    riskLabel: "Medium",
    action: "Compliance Review",
    status: "Manual Review"
  },
  {
    id: "RISK-HIGH-003",
    asset: "BTC",
    amount: "0.8421",
    sourceAddress: "bc1q...3j8s",
    riskScore: 87,
    riskLabel: "High",
    action: "Isolated",
    status: "Isolated"
  }
];

export const isolatedReviewItems = [
  {
    id: "CR-ISO-001",
    user: "Blue Harbor OTC",
    asset: "BTC",
    amount: "0.8421",
    sourceAddress: "bc1q...3j8s",
    riskReason: "Sanctions adjacency",
    status: "Compliance Review"
  },
  {
    id: "CR-ISO-002",
    user: "Atlas Web3 Labs",
    asset: "ETH",
    amount: "52.4000",
    sourceAddress: "0x91AC...4D70",
    riskReason: "Mixer proximity",
    status: "Manual Review"
  }
];

export const auditLogs = [
  { id: "AUD-9001", actor: "Maya Chen", action: "Reviewed isolated deposit", target: "CR-ISO-001", time: "19 May 2026 10:42", status: "Completed" },
  { id: "AUD-9002", actor: "Daniel Wong", action: "Updated risk label", target: "DEP-240517-004", time: "19 May 2026 10:18", status: "Completed" },
  { id: "AUD-9003", actor: "System", action: "Created compliance case", target: "CRC-5012", time: "19 May 2026 09:55", status: "Completed" },
  { id: "AUD-9004", actor: "Maya Chen", action: "Kept funds isolated", target: "ISO-9103", time: "19 May 2026 09:24", status: "Completed" }
];
