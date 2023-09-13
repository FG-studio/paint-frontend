import { GameConfig } from '../../types'

export type configViewComponentProps = {
  config: GameConfig
}

const ConfigViewComponent = ({ config }: configViewComponentProps) => {
  return (
    <>
      <div className="w-full h-full p-3 flex flex-col justify-center">
        <div>Configuration</div>
        <div>
          <div className="w-full flex flex-col justify-center items-center py-2">
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Max Player</p>
              <p className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500">
                {config.maxPlayer}
              </p>
            </div>
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Review Duraction (Sec)</p>
              <p className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500">
                {config.reviewDuration}
              </p>
            </div>
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Draw Duration (Sec)</p>
              <p className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500">
                {config.drawDuration}
              </p>
            </div>
            <div className="w-full flex flex-row justify-between items-center py-3">
              <p className="pr-5 w-[20%]">Answer Duration (Sec)</p>
              <p className="px-4 py-2 w-[70%] border rounded-lg focus:outline-none focus:border-gray-500">
                {config.guestDuration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfigViewComponent
