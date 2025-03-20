import React, { useState, useEffect } from 'react';
import { CurrencyRate } from '../types/CurrencyRate';
import { Card, CardContent, Grid2, Typography } from '@mui/material';

const CurrencyRates: React.FC = () => {
    const [rates, setRates] = useState<CurrencyRate[]>([]);
    const [fetchTime, setFetchTime] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrencyRates = async () => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;

            if(!apiKey) {
                setError('Failed to get api key');
                return;
            }

            const bearer = 'Bearer ' + apiKey;
            console.log(bearer);

            const response = await fetch(`https://v1.apiplugin.io/v1/currency/QZBy75qV/rates?source=RUB`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }
            });

            console.log(response.status);

            if(!response.ok) {
                setError('Failed to fetch currency rates');
                return;
            }

            const responseData = await response.json();

            setRates([
                { currency: 'USD', rate: 1 / responseData.rates.USD, symbol: '$' },
                { currency: 'EUR', rate: 1 / responseData.rates.EUR, symbol: '€' },
                { currency: 'GBP', rate: 1 / responseData.rates.GBP, symbol: '£' }
            ]);

            const now = new Date();
            const formatter = new Intl.DateTimeFormat('ru-RU', {
                dateStyle: 'full',
                timeStyle: 'long',
            });
            setFetchTime(formatter.format(now));
        } catch (error) {
            setError((error as Error).message);
        } 
    }

    useEffect(() => { fetchCurrencyRates(); }, []);

    if(error) {
        return <Typography>{error}</Typography>
    }

    return (
        <Grid2 container spacing={2} justifyContent='center'>
            { rates.map((rate) => (
                <Grid2>
                    <Card sx={{ width: '100%', height: 90 }}>
                        <CardContent>
                            <Typography variant='h6'>
                                {rate.currency} ({rate.symbol})
                            </Typography>
                            <Typography variant='body1'>
                                { new Intl.NumberFormat('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB'
                                }).format(rate.rate)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
            { fetchTime && (
                <Grid2 justifyContent='center'>
                    <Typography variant='caption' color='textSecondary'>Fetch time: { fetchTime }</Typography>
                </Grid2>
            )}
        </Grid2>
    );
};

export default CurrencyRates;