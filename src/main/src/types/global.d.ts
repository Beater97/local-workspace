export {};

declare global {
  interface Type {
    id: number;
    name: string;
    iconName?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  interface Status {
    id: number;
    position: number;
    iconName?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  interface Cliente {
    id: number;
    name: string;
    iconBase64?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  interface Activity {
    id: number;
    typeId: number;
    priority: number;
    title: string;
    description?: string;
    statusId: number;
    clientId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }
}
