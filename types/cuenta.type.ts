
export type TipoCuenta = 'tradicional' | 'especializada' | 'plazo_fijo' | 'digital' | 'especial'

export type Moneda = 'COP' | 'USD' | 'EUR'

export type RetirosMensuales = 'ilimitados' | 'limitados' | 'condicionado' | '0'

export interface Cuenta {
  id: number
  nombre: string
  tipo: TipoCuenta
  descripcion: string
  caracteristicas: string[]
  tasa_interes: string
  saldo_minimo: number
  retiros_mensuales: RetirosMensuales
  moneda: Moneda
}