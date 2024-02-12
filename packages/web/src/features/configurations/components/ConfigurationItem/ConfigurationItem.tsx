import { Space } from '@/infrastructure/components/Space'
import { Chip, ChipProps } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

export interface ConfigurationItemProps {
  title: string
  description: string
  icon?: React.ReactNode
  rightControl?: boolean
  status?: string
  statusColor?: ChipProps['color']
}

export const ConfigurationItem = ({
  title,
  children,
  description,
  icon,
  rightControl = false,
  status,
  statusColor = 'success',
}: PropsWithChildren<ConfigurationItemProps>) => {
  return (
    <div className='flex'>
      <div className='flex-1'>
        <div className='text-sm font-semibold'>
          <Space direction='horizontal' size='small' align='center'>
            {icon ? <span>{icon}</span> : null}
            <span>{title}</span>
            {status ? (
              <span>
                <Chip size='sm' color={statusColor}>
                  {status}
                </Chip>
              </span>
            ) : null}
          </Space>
        </div>

        <Space size='small'>
          {description ? (
            <div className='text-sm text-slate-500'>{description}</div>
          ) : null}
          {!rightControl && children ? <div>{children}</div> : null}
        </Space>
      </div>
      {rightControl && children ? (
        <div className='flex-none pl-6'>{children}</div>
      ) : null}
    </div>
  )
}
