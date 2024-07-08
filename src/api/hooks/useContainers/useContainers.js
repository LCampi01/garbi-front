import { useFetch } from "../../../hooks/useFetch"
import { useGetContainers } from "./request"

export const useContainers = () => {
    const { getContainers, isLoadingGetContainers } = useGetContainers()

    return {
        getContainers: {
            getContainers,
            isLoadingGetContainers
        }
    }
}