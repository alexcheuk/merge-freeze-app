import { Header } from '@/infrastructure/components/Header'
import { Divider } from '@nextui-org/react'

export interface ConfigurationHeaderProps {
  title: string
}

export const ConfigurationHeader = ({ title }: ConfigurationHeaderProps) => {
  return (
    <div>
      <Header as='h5'>{title}</Header>
      <Divider />
    </div>
  )
}
