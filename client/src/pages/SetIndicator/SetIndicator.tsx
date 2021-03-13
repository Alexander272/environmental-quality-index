import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/client'
import { MainLayout } from '../../layout/MainLayout'
import { Loader } from '../../components/Loader/Loader'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { userSelectAccess } from '../../store/users/userSlice'
import { IndicatorDataType } from '../../types/indicators'
import indicatorsData from '../../data/indicatorData.json'
import addValue from '../../graphql/indicators/addValue'
import classes from './setIndicator.module.scss'
import { Toasts } from '../../components/Toasts/Toasts'

export const SetIndicatorPage = () => {
    const { indicator } = useParams<{ indicator: string }>()
    const access = useSelector(userSelectAccess)
    const [add] = useMutation(addValue)
    const [currentIndicator, setCurrentIndicator] = useState<IndicatorDataType | null>(null)
    const [result, setResult] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState<any>({})

    useEffect(() => {
        const index = indicatorsData.indicators.findIndex(i => i.link === indicator)
        if (index > -1) setCurrentIndicator(indicatorsData.indicators[index])
        const keys: any = {}
        indicatorsData.indicators[index].fields.forEach(field => (keys[field.key] = 0))
        setForm(keys)
    }, [indicator])

    if (!access?.includes(indicator))
        return (
            <MainLayout>
                <h1 className={classes.error}>У вас нет доступа для заполнения показателя</h1>
            </MainLayout>
        )

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const saveHandler = async () => {
        try {
            setLoading(true)
            const res = await add({
                variables: { link: indicator, params: form },
            })
            setLoading(false)
            setResult(res.data.addValueIndicator)
        } catch (error) {
            setLoading(false)
            setError('Что-то пошло не так')
        }
    }

    return (
        <MainLayout>
            {currentIndicator ? (
                <>
                    <h1 className={classes.title}>{currentIndicator.title}</h1>
                    {loading && (
                        <div className={classes.loader}>
                            <Loader size={'md'} />
                        </div>
                    )}
                    {error && <Toasts type={'error'} message={error} />}
                    <div className={classes.inputsContainer}>
                        {currentIndicator.fields.map(i => (
                            <React.Fragment key={i.key}>
                                <Input
                                    type="number"
                                    inputType="stand"
                                    placeholder={i.title}
                                    value={form[i.key]}
                                    name={i.key}
                                    onChange={changeHandler}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    {result != null && (
                        <p className={classes.resultContainer}>
                            Результат расчета:{' '}
                            <span className={classes.result}>{result.toFixed(2)}</span>
                        </p>
                    )}
                    <Button
                        text="Расчитать показатель"
                        type="primary"
                        icon={faCalculator}
                        onClick={saveHandler}
                    />
                </>
            ) : (
                <div className={classes.loader}>
                    <Loader size={'md'} />
                </div>
            )}
        </MainLayout>
    )
}
