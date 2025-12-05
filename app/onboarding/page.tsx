'use client'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';


const OnbordingPage = () => {
    const [formData, setFormData] = useState({
        tipoDocumento: '',
        documento: '',
        nombre: '',
        correo: '',
        recaptcha: ''
    });

    const [errors, setErrors] = useState({
        tipoDocumento: '',
        documento: '',
        nombre: '',
        correo: '',
        recaptcha: ''
    });

    const [requestCode, setRequestCode] = useState<null | string>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateDocumento(documento: string): boolean {
        return /^\d+$/.test(documento);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar en tiempo real
        let error = '';
        if (value.trim() === '') {
            error = 'Este campo es requerido';
        } else if (name === 'documento' && !validateDocumento(value)) {
            error = 'El documento debe contener solo números';
        } else if (name === 'correo' && !validateEmail(value)) {
            error = 'Correo electrónico inválido';
        } else if (name === 'recaptcha' && value !== 'OK') {
            error = 'Debes ingresar "OK" para pasar la validación';
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }

    function handleSelectChange(value: string) {
        setFormData(prev => ({
            ...prev,
            tipoDocumento: value
        }));
        setErrors(prev => ({
            ...prev,
            tipoDocumento: ''
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        // Simular reCAPTCHA - siempre es válido
        const recaptchaSimulado = 'OK';
        
        // Validar todos los campos
        const newErrors = {
            tipoDocumento: !formData.tipoDocumento ? 'Debes seleccionar un tipo de documento' : '',
            documento: !formData.documento ? 'Este campo es requerido' : !validateDocumento(formData.documento) ? 'El documento debe contener solo números' : '',
            nombre: !formData.nombre ? 'Este campo es requerido' : '',
            correo: !formData.correo ? 'Este campo es requerido' : !validateEmail(formData.correo) ? 'Correo electrónico inválido' : '',
            recaptcha: recaptchaSimulado !== 'OK' ? 'La validación de reCAPTCHA falló' : ''
        };

        setErrors(newErrors);

        // Si hay errores, no continuar
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        // Si todo es válido, generar código de solicitud
        const requestCodeGenerated = uuidv4();
        setRequestCode(requestCodeGenerated);
        setIsSubmitted(true);
        setFormData({
            tipoDocumento: '',
            documento: '',
            nombre: '',
            correo: '',
            recaptcha: ''
        });
        setErrors({
            tipoDocumento: '',
            documento: '',
            nombre: '',
            correo: '',
            recaptcha: ''
        });
    }

    return (
        <div className='min-h-screen p-8 bg-gray-50'>
            <div className='max-w-md mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold mb-2'>Onboarding</h1>
                    <p className='text-gray-600'>Registra tu intención de apertura de cuenta</p>
                </div>
                {isSubmitted && requestCode ? (
                    <Alert className='border-green-200 bg-green-50'>
                        <CheckCircle2 className='h-4 w-4 text-green-600' />
                        <AlertTitle className='text-green-800 ml-2'>¡Solicitud Registrada!</AlertTitle>
                        <AlertDescription className='text-green-700 ml-2 mt-2'>
                            <p className='mb-3'>Tu solicitud ha sido enviada exitosamente.</p>
                            <p className='font-semibold mb-4'>Código de solicitud:</p>
                            <div className='bg-white p-3 rounded-md border border-green-200 mb-4 font-mono text-sm break-all'>
                                {requestCode}
                            </div>
                            <Button 
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setRequestCode(null);
                                }}
                                variant='outline'
                                className='w-full'
                            >
                                Registrar otra solicitud
                            </Button>
                        </AlertDescription>
                    </Alert>
                ) : (
                    <div className='bg-white p-8 rounded-lg shadow-md'>
                        <h1 className='text-2xl font-bold mb-6'>Registrar Intención de Apertura</h1>

                        <form onSubmit={handleSubmit} className='space-y-5'>
                            <div className='space-y-2'>
                                <Label htmlFor='tipoDocumento'>Tipo de Documento</Label>
                                <Select value={formData.tipoDocumento} onValueChange={handleSelectChange}>
                                    <SelectTrigger id='tipoDocumento' className={`w-full ${errors.tipoDocumento ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder='Selecciona un tipo de documento' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='CC'>Cédula de Ciudadanía (CC)</SelectItem>
                                        <SelectItem value='CE'>Cédula de Extranjería (CE)</SelectItem>
                                        <SelectItem value='PS'>Pasaporte (PS)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.tipoDocumento && (
                                    <p className='text-red-500 text-sm'>{errors.tipoDocumento}</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='documento'>Número de Documento</Label>
                                <Input
                                    id='documento'
                                    type='number'
                                    name='documento'
                                    value={formData.documento}
                                    onChange={handleInputChange}
                                    placeholder='Tu número de documento'
                                    disabled={!formData.tipoDocumento}
                                    className={errors.documento ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.documento && (
                                    <p className='text-red-500 text-sm'>{errors.documento}</p>
                                )}
                                {!formData.tipoDocumento && (
                                    <p className='text-gray-500 text-sm'>Primero selecciona un tipo de documento</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='nombre'>Nombre</Label>
                                <Input
                                    id='nombre'
                                    type='text'
                                    name='nombre'
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    placeholder='Tu nombre completo'
                                    className={errors.nombre ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.nombre && (
                                    <p className='text-red-500 text-sm'>{errors.nombre}</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='correo'>Correo Electrónico</Label>
                                <Input
                                    id='correo'
                                    type='email'
                                    name='correo'
                                    value={formData.correo}
                                    onChange={handleInputChange}
                                    placeholder='tu@email.com'
                                    className={errors.correo ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.correo && (
                                    <p className='text-red-500 text-sm'>{errors.correo}</p>
                                )}
                            </div>

                            <div className='space-y-2 hidden'>
                                <Label htmlFor='recaptcha'>Verificación reCAPTCHA (escribe &quot;OK&quot;)</Label>
                                <Input
                                    id='recaptcha'
                                    type='text'
                                    name='recaptcha'
                                    value={formData.recaptcha}
                                    onChange={handleInputChange}
                                    placeholder='Ingresa OK para verificar'
                                    className={errors.recaptcha ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.recaptcha && (
                                    <p className='text-red-500 text-sm'>{errors.recaptcha}</p>
                                )}
                            </div>

                            <Button type='submit' className='w-full cursor-pointer'>
                                Enviar Solicitud
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnbordingPage;