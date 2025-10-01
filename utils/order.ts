import { OrderStatus } from '@/types'

export function convertOrderStatusToLib(status: OrderStatus) {
	switch (status) {
		case OrderStatus.pending:
			return 'En attente'
		case OrderStatus.confirmed:
			return 'Livré'
		case OrderStatus.cancelled:
			return 'Annulé'
		default:
			return 'En attente.'
	}
}