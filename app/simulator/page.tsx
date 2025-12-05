'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {  CheckCircle2, TrendingUp } from 'lucide-react'

const SimulatorPage = () => {
    const [formData, setFormData] = useState({
        montoInicial: '',
        meses: ''
    })

    const [errors, setErrors] = useState({
        montoInicial: '',
        meses: ''
    })

    const [resultado, setResultado] = useState<{
        montoInicial: number
        meses: number
        interesTotal: number
        montoFinal: number
    } | null>(null)

    
    const INTERES_MENSUAL = 0.01 
    const INTERES_MENSUAL_PCT = (INTERES_MENSUAL * 100)

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }
    function parseNumberFromString(value: string): number {
        if (!value) return NaN
        
        const cleaned = value.replace(/\./g, '').replace(/[^0-9-]+/g, '')
        return parseFloat(cleaned)
    }

    function validateInput(name: string, value: string): string {
        if (!value.trim()) return 'Este campo es requerido'
        
        const numValue = parseNumberFromString(value)
        if (isNaN(numValue)) return 'Debe ser un número válido'
        if (numValue <= 0) return 'Debe ser mayor a 0'
        
        if (name === 'meses' && (!Number.isInteger(numValue) || numValue > 600)) {
            return 'Debe ser entre 1 y 600 meses'
        }
        return ''
    }

    function formatInputCurrency(value: string) {
        const cleaned = value.replace(/[^0-9]/g, '')
        if (!cleaned) return ''
        return new Intl.NumberFormat('es-CO').format(Number(cleaned))
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        
        if (name === 'montoInicial') {
            const formatted = formatInputCurrency(value)
            setFormData(prev => ({ ...prev, [name]: formatted }))
            setErrors(prev => ({ ...prev, [name]: validateInput(name, formatted) }))
            return
        }

        setFormData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: validateInput(name, value) }))
    }

    function calculateSimulation() {
        const montoInicial = parseNumberFromString(formData.montoInicial)
        const meses = parseInt(formData.meses)

        setResultado({
            montoInicial,
            meses,
            interesTotal: montoInicial * INTERES_MENSUAL * meses,
            montoFinal: montoInicial + (montoInicial * INTERES_MENSUAL * meses)
        })
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const newErrors = {
            montoInicial: validateInput('montoInicial', formData.montoInicial),
            meses: validateInput('meses', formData.meses)
        }

        setErrors(newErrors)
        if (Object.values(newErrors).some(error => error)) return

        calculateSimulation()
    }

    function handleReset() {
        setFormData({ montoInicial: '', meses: '' })
        setErrors({ montoInicial: '', meses: '' })
        setResultado(null)
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-4xl mx-auto p-8'>
                <div className='mb-8'>
                    <h1 className="text-4xl font-bold mb-2">Simulador de Rentabilidad</h1>
                    <p className='text-gray-600'>Calcula tu proyección de ahorros con interés compuesto</p>
                </div>

                {!resultado ? (
                    <div className='grid md:grid-cols-2 gap-8'>
                        
                        <div className='bg-white p-8 rounded-lg shadow-md'>
                            <h2 className='text-2xl font-bold mb-6'>Datos de simulación</h2>
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                <div className='space-y-2'>
                                    <Label htmlFor='montoInicial'>Monto Inicial</Label>
                                    <div className='relative'>
                                        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>$</span>
                                        <Input
                                            id='montoInicial'
                                            type='text'
                                            name='montoInicial'
                                            value={formData.montoInicial}
                                            onChange={handleInputChange}
                                            placeholder='1.000.000'
                                            className={`pl-8 ${errors.montoInicial ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.montoInicial && (
                                        <p className='text-red-500 text-sm'>{errors.montoInicial}</p>
                                    )}
                                </div>

                                {/* Aporte mensual removido por requerimiento */}

                                <div className='space-y-2'>
                                    <Label htmlFor='meses'>Número de Meses</Label>
                                    <Input
                                        id='meses'
                                        type='number'
                                        name='meses'
                                        value={formData.meses}
                                        onChange={handleInputChange}
                                        placeholder='12'
                                        className={errors.meses ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                        step='1'
                                        min='1'
                                    />
                                    {errors.meses && (
                                        <p className='text-red-500 text-sm'>{errors.meses}</p>
                                    )}
                                    <p className='text-gray-500 text-xs mt-1'>Ingresa entre 1 y 600 meses</p>
                                </div>

                                <div className='bg-blue-50 p-4 rounded-md border border-blue-200'>
                                    <p className='text-sm text-blue-800'>
                                        <span className='font-semibold'>Tasa de interés:</span> 1% mensual (12% anual simple)
                                    </p>
                                </div>

                                <Button type='submit' className='w-full'>
                                    Calcular Simulación
                                </Button>
                            </form>
                        </div>

                        
                        <div className='bg-white p-8 rounded-lg shadow-md'>
                            <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
                                <TrendingUp className='h-6 w-6 text-green-600' />
                                ¿Cómo funciona?
                            </h2>
                            <div className='space-y-4 text-sm text-gray-700'>
                                <div>
                                    <h3 className='font-semibold text-gray-900 mb-2'>Fórmula de cálculo:</h3>
                                    <p className='bg-gray-50 p-3 rounded font-mono text-xs'>
                                        Para cada mes:<br/>
                                        Interés mensual = Monto Inicial × 1%<br/>
                                        Interés total = Interés mensual × meses<br/>
                                        Monto final = Monto Inicial + Interés total
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='space-y-6 animate-in fade-in duration-500'>
                        <Alert className='border-green-200 bg-green-50'>
                            <CheckCircle2 className='h-4 w-4 text-green-600' />
                            <AlertTitle className='text-green-800 ml-2'>¡Simulación Completada!</AlertTitle>
                            <AlertDescription className='text-green-700 ml-2'>
                                Aquí está tu proyección de ahorros con interés compuesto (12% anual, ≈ {INTERES_MENSUAL_PCT.toFixed(3)}% mensual).
                            </AlertDescription>
                        </Alert>

                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500'>
                                <p className='text-gray-600 text-sm mb-1'>Monto Inicial</p>
                                <p className='text-2xl font-bold text-gray-900'>{formatCurrency(resultado.montoInicial)}</p>
                            </div>

                            {/* Total aportado eliminado (sin aportes mensuales) */}

                            <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500'>
                                <p className='text-gray-600 text-sm mb-1'>Interés Generado</p>
                                <p className='text-2xl font-bold text-green-600'>{formatCurrency(resultado.interesTotal)}</p>
                            </div>

                            <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 md:col-span-2 lg:col-span-1'>
                                <p className='text-gray-600 text-sm mb-1'>Saldo Final</p>
                                <p className='text-2xl font-bold text-purple-600'>{formatCurrency(resultado.montoFinal)}</p>
                            </div>
                        </div>

                        <div className='bg-white p-6 rounded-lg shadow-md'>
                            <h3 className='text-lg font-bold mb-4'>Resumen de la simulación</h3>
                            <div className='space-y-3 text-sm'>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Monto inicial:</span>
                                    <span className='font-semibold'>{formatCurrency(resultado.montoInicial)}</span>
                                </div>
                                <div className='flex justify-between border-b pb-2'>
                                    <span className='text-gray-600'>Período:</span>
                                    <span className='font-semibold'>{resultado.meses} meses ({(resultado.meses / 12).toFixed(1)} años)</span>
                                </div>
                                <div className='flex justify-between text-base bg-green-50 p-3 rounded border border-green-200'>
                                    <span className='text-gray-900 font-semibold'>Ganancia por interés:</span>
                                    <span className='font-bold text-green-600'>{formatCurrency(resultado.interesTotal)}</span>
                                </div>
                                <div className='flex justify-between text-base bg-purple-50 p-3 rounded border border-purple-200'>
                                    <span className='text-gray-900 font-semibold'>Monto final:</span>
                                    <span className='font-bold text-purple-600'>{formatCurrency(resultado.montoFinal)}</span>
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleReset} className='w-full' variant='outline'>
                            Nueva Simulación
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SimulatorPage
