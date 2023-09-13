import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../../../components/button/button'

const schema = z.object({
  maxPlayer: z.number().min(3).positive(),
  reviewDuration: z.number().positive(),
  drawDuration: z.number().positive(),
  guestDuration: z.number().positive(),
})

export type ConfigFormComponentProps = {
  defaultValue?: z.infer<typeof schema>
  onSubmitCb?: (data: z.infer<typeof schema>) => void | Promise<void>
}

const ConfigFormComponent = ({
  defaultValue,
  onSubmitCb,
}: ConfigFormComponentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  })

  useEffect(() => {
    reset(defaultValue)
  }, [defaultValue, reset])

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (onSubmitCb) {
      onSubmitCb(data)
    }
  }
  return (
    <>
      <div className="w-full h-full p-3 flex flex-col justify-center">
        <div>Configuration</div>
        <form>
          <div className="w-full flex flex-col justify-center items-center py-2">
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Max Player</p>
              <input
                className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('maxPlayer', { valueAsNumber: true })}
              />
            </div>
            <div>
              {errors.maxPlayer ? (
                <p className="text-red-500">{errors.maxPlayer.message}</p>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center py-2">
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Review Duraction (Sec)</p>
              <input
                className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('reviewDuration', { valueAsNumber: true })}
              />
            </div>
            <div>
              {errors.reviewDuration ? (
                <p className="text-red-500">{errors.reviewDuration.message}</p>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center py-2">
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Draw Duration (Sec)</p>
              <input
                className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('drawDuration', { valueAsNumber: true })}
              />
            </div>
            <div>
              {errors.drawDuration ? (
                <p className="text-red-500">{errors.drawDuration.message}</p>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center py-2">
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Answer Duration (Sec)</p>
              <input
                className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500"
                {...register('guestDuration', { valueAsNumber: true })}
              />
            </div>
            <div>
              {errors.guestDuration ? (
                <p className="text-red-500">{errors.guestDuration.message}</p>
              ) : null}
            </div>
          </div>
        </form>
        <div className="w-full flex flex-row justify-end items-end">
          <Button
            variant="primary"
            className="w-32"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  )
}

export default ConfigFormComponent
