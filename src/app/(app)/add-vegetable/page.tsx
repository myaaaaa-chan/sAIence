'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Layers, LoaderCircle, Check, ArrowLeft, Sprout } from 'lucide-react'
import { Card, CardBody, Button, Combobox } from '@/components/ui'
import { AiTimelineCard } from '@/features/vegetables/components'
import { useVegetableStore, useEventStore } from '@/lib/stores'
import { useSettingsStore } from '@/features/settings/store/settings-store'
import { fetchSchedule } from '@/features/vegetables/api/schedule-api'
import { VEGETABLES, CATEGORIES } from '@/constants/vegetables'
import type { AiScheduleResponse, AiScheduleEvent } from '@/types/api'
import type { EventType } from '@/types'

const REGIONS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州', '沖縄']
const CULTIVATION_METHODS = ['地植え', 'プランター', '水耕栽培']

type Step = 1 | 2 | 3

const vegetableOptions = CATEGORIES.flatMap((cat) => {
  const items = VEGETABLES.filter((v) => v.category === cat.id)
  return items.map((v) => ({
    value: v.name,
    label: `${v.name}`,
  }))
})

export default function AddVegetablePage() {
  const router = useRouter()
  const { region: defaultRegion, cultivationMethod: defaultMethod } = useSettingsStore()
  const addVegetable = useVegetableStore((s) => s.addVegetable)
  const bulkAddEvents = useEventStore((s) => s.bulkAddEvents)

  const [step, setStep] = useState<Step>(1)

  // Form state
  const [vegetableName, setVegetableName] = useState('')
  const [plantedDate, setPlantedDate] = useState(new Date().toISOString().slice(0, 10))
  const [region, setRegion] = useState(defaultRegion)
  const [cultivationMethod, setCultivationMethod] = useState(defaultMethod)
  const [brand, setBrand] = useState('')
  const [memo, setMemo] = useState('')

  // Step 2 state
  const [isGenerating, setIsGenerating] = useState(false)
  const [scheduleData, setScheduleData] = useState<AiScheduleResponse | null>(null)
  const [scheduleError, setScheduleError] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  const isFormValid = vegetableName.trim() !== '' && plantedDate !== ''

  const selectClassName =
    'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none'

  const handleGenerateSchedule = useCallback(async () => {
    setScheduleError(null)
    setIsGenerating(true)
    setStep(2)

    const result = await fetchSchedule({
      vegetableName: vegetableName.trim(),
      plantedAt: plantedDate,
      region,
      brand: brand.trim() || undefined,
      memo: memo.trim() || undefined,
    })

    setIsGenerating(false)

    if (result.ok) {
      setScheduleData(result.data)
    } else {
      setScheduleError(result.error)
    }
  }, [vegetableName, plantedDate, region, brand, memo])

  const handleRegister = useCallback(async () => {
    if (!scheduleData) return
    setIsRegistering(true)

    try {
      const vegetable = await addVegetable({
        name: vegetableName.trim(),
        category: VEGETABLES.find((v) => v.name === vegetableName.trim())?.category ?? '',
        plantedDate,
        region,
        cultivationMethod,
        brand: brand.trim() || undefined,
        memo: memo.trim() || undefined,
        status: 'active',
      })

      await bulkAddEvents(
        scheduleData.events.map((event: AiScheduleEvent) => ({
          vegetableId: vegetable.id,
          title: event.title,
          date: event.scheduledDate,
          type: event.type as EventType,
          description: event.description,
          isCompleted: false,
        }))
      )

      setStep(3)
    } catch {
      setScheduleError('登録に失敗しました。もう一度お試しください。')
    } finally {
      setIsRegistering(false)
    }
  }, [scheduleData, vegetableName, plantedDate, region, cultivationMethod, brand, memo, addVegetable, bulkAddEvents])

  const handleReset = useCallback(() => {
    setStep(1)
    setVegetableName('')
    setPlantedDate(new Date().toISOString().slice(0, 10))
    setRegion(defaultRegion)
    setCultivationMethod(defaultMethod)
    setBrand('')
    setMemo('')
    setScheduleData(null)
    setScheduleError(null)
  }, [defaultRegion, defaultMethod])

  const timelineEvents = scheduleData?.events.map((e) => ({
    date: e.scheduledDate,
    title: e.title,
    type: e.type as EventType,
    description: e.description,
  })) ?? []

  return (
    <div className="mx-auto max-w-[640px] px-4 py-6">
      <h1 className="mb-6 text-[22px] font-extrabold">野菜を追加</h1>

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-0">
        <StepIndicator number={1} label="基本情報の入力" current={step} />
        <div className="mx-2 h-px w-8 bg-gray-300" />
        <StepIndicator number={2} label="AIスケジュール確認" current={step} />
      </div>

      {/* Step 1: Form */}
      {step === 1 && (
        <Card>
          <CardBody className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">
                野菜の種類<span className="text-red-500">*</span>
              </label>
              <Combobox
                options={vegetableOptions}
                value={vegetableName}
                onChange={setVegetableName}
                placeholder="例: トマト、なす、バジル…"
                searchPlaceholder="野菜名で検索..."
              />
            </div>

            <div>
              <label htmlFor="brand" className="mb-1 block text-sm font-semibold">
                品種・ブランド
              </label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="例: サカタのタネ グリーンバジル"
                className={selectClassName}
              />
            </div>

            <div>
              <label htmlFor="cultivation-method" className="mb-1 block text-sm font-semibold">
                栽培方法
              </label>
              <select
                id="cultivation-method"
                value={cultivationMethod}
                onChange={(e) => setCultivationMethod(e.target.value)}
                className={selectClassName}
              >
                {CULTIVATION_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="planted-date" className="mb-1 block text-sm font-semibold">
                植付日<span className="text-red-500">*</span>
              </label>
              <input
                id="planted-date"
                type="date"
                value={plantedDate}
                onChange={(e) => setPlantedDate(e.target.value)}
                className={`${selectClassName} appearance-none max-w-full`}
              />
            </div>

            <div>
              <label htmlFor="region" className="mb-1 block text-sm font-semibold">
                地域
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={selectClassName}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                地域を選択するとより正確なスケジュールが生成されます
              </p>
            </div>

            <div>
              <label htmlFor="memo" className="mb-1 block text-sm font-semibold">
                メモ
              </label>
              <textarea
                id="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="育て方の特記事項など…（200文字まで）"
                maxLength={200}
                rows={3}
                className={`${selectClassName} resize-none`}
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={!isFormValid}
              onClick={handleGenerateSchedule}
            >
              <Layers size={18} />
              AIスケジュールを生成
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Step 2: Loading */}
      {step === 2 && isGenerating && (
        <Card>
          <CardBody className="flex flex-col items-center justify-center py-12 gap-3">
            <LoaderCircle size={36} className="animate-spin text-green-600" />
            <p className="text-[15px] font-semibold">AIがスケジュールを考えています…</p>
            <p className="text-[13px] text-gray-500">
              {vegetableName}の栽培計画を生成中
            </p>
          </CardBody>
        </Card>
      )}

      {/* Step 2: Error */}
      {step === 2 && !isGenerating && scheduleError && (
        <Card>
          <CardBody className="flex flex-col items-center justify-center py-12 gap-3">
            <p className="text-sm text-red-600">{scheduleError}</p>
            <div className="flex gap-3 mt-2">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft size={16} />
                戻る
              </Button>
              <Button variant="primary" onClick={handleGenerateSchedule}>
                再試行
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Step 2: Schedule result */}
      {step === 2 && !isGenerating && !scheduleError && scheduleData && (
        <div className="space-y-4">
          {scheduleData.notes && (
            <Card>
              <CardBody>
                <div className="rounded-lg bg-green-50 p-3 text-[13px] text-green-800 leading-relaxed">
                  <strong>栽培のポイント:</strong> {scheduleData.notes}
                </div>
              </CardBody>
            </Card>
          )}

          <AiTimelineCard
            events={timelineEvents}
            onConfirm={handleRegister}
            onCancel={() => setStep(1)}
            isLoading={isRegistering}
          />
        </div>
      )}

      {/* Step 3: Complete */}
      {step === 3 && (
        <Card>
          <CardBody className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <Check size={28} className="text-green-600" />
            </div>
            <p className="text-lg font-bold">登録完了!</p>
            <p className="text-sm text-gray-500">
              {vegetableName}の栽培スケジュールを登録しました
            </p>
            <div className="flex gap-3 mt-2">
              <Button variant="secondary" onClick={handleReset}>
                <Sprout size={16} />
                続けて追加
              </Button>
              <Button variant="primary" onClick={() => router.push('/garden')}>
                マイ菜園を見る
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

function StepIndicator({ number, label, current }: { number: number; label: string; current: Step }) {
  const isDone = current > number
  const isActive = current === number

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
          isDone
            ? 'bg-green-600 text-white'
            : isActive
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-500'
        }`}
      >
        {isDone ? <Check size={14} /> : number}
      </div>
      <span
        className={`text-sm font-medium ${
          isActive ? 'text-green-700' : isDone ? 'text-gray-500' : 'text-gray-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
