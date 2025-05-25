import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Status {
  inUse: boolean
  lastRecord?: {
    dataInicio: string
    dataFim?: string
  }
}

type Params = {
  placa: string
}

export function TemporaryVehiclePage() {
  const { placa } = useParams<Params>()
  const [status, setStatus] = useState<Status>({ inUse: false })
  const [uid, setUid] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(
          `http://localhost:3000/veiculos/${placa}/status`
        )
        if (!res.ok) throw new Error('Falha ao buscar status')

        const data: Status = await res.json()
        setStatus(data)

      } catch (err: any) {
        setError(err.message)

      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [placa])

  async function handleAction() {
    setError(null)
    setSuccess(null)

    const endpoint = status.inUse ? 'end' : 'start'
    const url = `http://localhost:3000/veiculos/${placa}/uso/${endpoint}`
    const bodyPayload = !status.inUse && !Boolean(uid)
      ? null
      : JSON.stringify(uid ? { uid } : {})

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyPayload,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro na requisição')

      if (status.inUse) {
        setSuccess(`Uso finalizado em ${new Date(data.dataFim).toLocaleString()}`)
      } else {
        setSuccess(`Uso iniciado em ${new Date(data.dataInicio).toLocaleString()}`)
      }

      setStatus(prev => ({ ...prev, inUse: !prev.inUse }))
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Veículo: {placa}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          {!status.inUse && (
            <div className="space-y-1">
              <Label htmlFor="uid">Informe seu UID</Label>
              <Input
                id="uid"
                value={uid}
                onChange={e => setUid(e.target.value)}
                placeholder="Ex: A12345"
              />
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleAction}
            disabled={!status.inUse && !uid}
          >
            {status.inUse ? 'Finalizar Uso' : 'Iniciar Uso'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}