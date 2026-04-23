/**
 * Domain types for Time-Off Management
 */

export interface Balance {
  id: string
  employeeId: string
  locationId: string
  policyId: string // e.g., "VACATION", "SICK", "BEREAVEMENT"
  available: number
  taken: number
  pending: number
  total: number
  lastUpdated: Date
  isStale?: boolean
}

export interface TimeOffRequest {
  id: string
  employeeId: string
  locationId: string
  policyId: string
  startDate: Date
  endDate: Date
  days: number
  reason: string
  status: 'pending' | 'approved' | 'denied'
  submittedAt: Date
  approvedAt?: Date
  approvedBy?: string
  denialReason?: string
  isOptimistic?: boolean // UI state only
}

export interface Employee {
  id: string
  name: string
  email: string
  locationId: string
  managerId?: string
}

export interface Manager {
  id: string
  name: string
  email: string
  teamMemberIds: string[]
}

export interface HCMError {
  code: string
  message: string
  timestamp: Date
  retryable: boolean
}

export type HCMHealth = 'healthy' | 'stale' | 'error'

export interface AppState {
  // Data
  balances: Map<string, Balance[]>
  requests: Map<string, TimeOffRequest[]>
  currentEmployee?: Employee
  currentManager?: Manager

  // UI state
  loading: boolean
  error: HCMError | null
  hcmHealth: HCMHealth
  lastSyncTime: Date

  // Optimistic updates tracking
  optimisticUpdates: Map<string, Partial<Balance | TimeOffRequest>>
}
