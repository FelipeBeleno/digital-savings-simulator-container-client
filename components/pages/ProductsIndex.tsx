'use client'
import { Cuenta } from '@/types/cuenta.type'
import useDebounce from '@/utils/hooks/useDebounce'
import React, { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'


interface ProductsClientProps {
  initialProducts: Cuenta[]
}

const ProductsIndex = ({ initialProducts }: ProductsClientProps) => {


  const [q, setQ] = useState('')
  const debounceQ = useDebounce(q)




  const dummyProductsCopy = useMemo(() => {
    if (debounceQ === '') {
      return initialProducts
    }

    const copy = initialProducts.filter((p) => {
      return (
        p.nombre.toLowerCase().includes(debounceQ.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(debounceQ.toLowerCase()) ||
        p.tipo.toLowerCase().includes(debounceQ.toLowerCase())
      )
    })

    
    return copy
  }, [debounceQ, initialProducts])

  function handleDebounce(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto p-8'>
        <div className='mb-8'>
          <h1 className="text-4xl font-bold mb-2">Productos</h1>
          <p className='text-gray-600'>Explora nuestro catálogo de productos</p>
        </div>

        <div className='relative mb-8'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          <Input
            name="debounced-input"
            placeholder="Buscar por nombre tipo o descripción..."
            onChange={(e) => handleDebounce(e)}
            value={q}
            className='pl-10'
          />
        </div>

        {dummyProductsCopy.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {dummyProductsCopy.map((p) => {
              return (
                <div
                  key={p.id}
                  className='bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4'
                >
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h2 className='text-xl font-bold text-gray-900'>{p.nombre}</h2>
                        <p className='text-gray-600 text-sm mt-1'>{p.descripcion}</p>
                      </div>
                      <Badge variant='outline'>{p.tipo}</Badge>
                    </div>

                    <div className='space-y-3 mb-4'>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>Tasa de Interés:</span>
                        <span className='font-semibold text-gray-900'>{p.tasa_interes}</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>Moneda:</span>
                        <Badge variant='secondary'>{p.moneda}</Badge>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>Saldo Mínimo:</span>
                        <span className='font-semibold text-gray-900'>${p.saldo_minimo.toLocaleString()}</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-600 text-sm'>Retiros Mensuales:</span>
                        <span className='text-sm font-medium text-gray-700 capitalize'>{p.retiros_mensuales.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {p.caracteristicas.length > 0 && (
                      <div className='pt-4 border-t border-gray-200'>
                        <p className='text-gray-600 text-sm font-semibold mb-2'>Características:</p>
                        <div className='flex flex-wrap gap-2'>
                          {p.caracteristicas.map((caracteristica, idx) => (
                            <Badge key={idx} variant='outline' className='text-xs'>
                              {caracteristica}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='text-center py-12 animate-in fade-in duration-300'>
            <p className='text-gray-500 text-lg'>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsIndex