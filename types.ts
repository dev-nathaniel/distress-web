export enum IncidentType {
    MEDICAL = 'MEDICAL',
    SECURITY = 'SECURITY',
    FIRE = 'FIRE',
    DOMESTIC = 'DOMESTIC',
    ACCIDENT = 'ACCIDENT'
}

export interface Incident {
    id: string;
    type: IncidentType;
    location: { lat: number; lng: number; address: string };
    timestamp: string;
    status: 'DISPATCHED' | 'RESOLVED' | 'PENDING' | 'ANALYZING';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    assetsDeployed?: string[]; // e.g., ["Drone-X1", "MOPOL-Unit-4"]
}

export interface User {
    id: string;
    name: string;
    role: 'CITIZEN' | 'ADMIN' | 'RESPONDER';
    isPremium: boolean;
}

export type ViewState = 'LANDING' | 'DASHBOARD' | 'PRICING';