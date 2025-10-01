export enum OrderStatus {
	pending = 'pending',
	confirmed = 'confirmed',
	cancelled = 'cancelled',
}

export interface ArticleType {
	id: string;
	name: string;
	slug: string;
	price: number;
	quantity_in_stock?: number;
	description: string;
	main_image: string;
	images?: string[];
	storeId: string;
	extras: any;
	createdAt: Date;
	updatedAt: Date;
}