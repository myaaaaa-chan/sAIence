'use client'

import { useSettingsStore } from '@/features/settings/store/settings-store'
import { Card, CardHeader, CardBody } from '@/components/ui'


const REGIONS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州', '沖縄']
const CULTIVATION_METHODS = ['地植え', 'プランター', '水耕栽培']

export default function SettingsPage() {
  const { region, cultivationMethod, setRegion, setCultivationMethod } = useSettingsStore()

  const selectClassName =
    'block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:border-green-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-[560px] px-4 py-6">
      <h1 className="mb-6 text-[22px] font-extrabold">設定</h1>

      <Card className="mb-5">
        <CardHeader>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
            栽培設定
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <label htmlFor="region" className="mb-1 block text-sm font-semibold">
              デフォルト地域
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={selectClassName}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
              野菜追加時のデフォルト地域として使用されます
            </p>
          </div>

          <div>
            <label htmlFor="cultivation-method" className="mb-1 block text-sm font-semibold">
              デフォルト栽培方法
            </label>
            <select
              id="cultivation-method"
              value={cultivationMethod}
              onChange={(e) => setCultivationMethod(e.target.value)}
              className={selectClassName}
            >
              {CULTIVATION_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </CardBody>
      </Card>

    </div>
  )
}
