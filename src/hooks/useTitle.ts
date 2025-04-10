import { useEffect } from "react";

export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = `Movisho: ${title}`

      }, [title])
    return null
}

 
