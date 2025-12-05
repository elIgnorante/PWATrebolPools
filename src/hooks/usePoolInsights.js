import { useEffect, useState } from 'react'
import { getInsights, saveInsights } from '../lib/pwaDatabase'

export const usePoolInsights = () => {
  const [insights, setInsights] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
          cache: 'no-cache'
        })
        if (!response.ok) throw new Error('No se pudo consultar tendencias')
        const data = await response.json()
        const normalized = data.map((item) => ({ id: item.id, title: item.title, body: item.body }))
        setInsights(normalized)
        await saveInsights(normalized)
      } catch (err) {
        setError(err.message)
        const cached = await getInsights()
        if (cached.length) {
          setInsights(cached)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsights()
  }, [])

  return { insights, isLoading, error }
}
