import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/utils";

const TABLE_NAME = 'stores'

export function useGetStoreProducts(storeId: string){
    return useQuery({
        enabled: !!storeId,
        queryKey: [`store_${storeId}`],
        queryFn: async function(){
            const {data, error} = await supabase
                .from(TABLE_NAME)
                .select('*')
                .eq('id', storeId)

            if (error) {
                throw error
            }

            return data
        },
    })
}
