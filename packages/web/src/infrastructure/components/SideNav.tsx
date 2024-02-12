import {
  Button,
  Divider,
  Link,
  Progress,
  Tooltip,
  User,
} from '@nextui-org/react'
import styled from 'styled-components'
import { useAuth } from '../providers/AuthProvider'
import { Space } from './Space'
import { NavLink, NavLinkProps } from 'react-router-dom'

const SideNavStyled = styled.div`
  position: fixed;
  z-index: 1000;

  width: ${(props) => props.theme.navWidth}px;
  top: 0;
  bottom: 0;

  background-color: #2b2e32;

  padding: 12px;
`

const LogoStyled = styled.div`
  color: ${(props) => props.theme.textPrimaryInverse};
  font-weight: 700;

  font-size: 24px;

  padding: 12px;
`

const LogoDivider = styled.div`
  display: block;

  width: 100%;
  height: 1px;
  background-color: #555;

  margin-top: 12px;
  margin-bottom: 24px;
`

const NavItem = styled((props: NavLinkProps) => {
  return <NavLink {...props} />
})`
  display: block;
  color: ${(props) => props.theme.navTextColor};
  font-size: 16px;
  padding: 12px;
  border-radius: ${(props) => props.theme.borderRadius}px;

  &.active {
    background-color: #36383c;
    color: ${(props) => props.theme.navActiveTextColor};
  }

  &:hover {
    background-color: #36383c;
    color: ${(props) => props.theme.navActiveTextColor};
  }
`

const UserProfileContainer = styled.div`
  background-color: #36383c;
  color: ${(props) => props.theme.textPrimaryInverse};

  padding: 12px;
  border-radius: ${(props) => props.theme.borderRadius}px;

  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
`

export const SideNav = () => {
  const { user } = useAuth()

  return (
    <SideNavStyled>
      <LogoStyled>
        /mf{' '}
        <span style={{ color: '#666', fontWeight: '300' }}>mergefreeze</span>
      </LogoStyled>

      <LogoDivider />

      <Space>
        <NavItem to={'/dashboard'}>Dashboard</NavItem>
        <NavItem to={'/manage'}>Configurations</NavItem>
        <NavItem to={'/history'}>History</NavItem>
      </Space>

      {user ? (
        <UserProfileContainer>
          <Space>
            <div>
              <div className='text-xs text-slate-400'>Subscription</div>
              <Tooltip
                showArrow
                placement='top'
                content='Next renewal: Whenever'
              >
                <div className='text-sm font-bold'>Premium Pro Plus Ultra</div>
              </Tooltip>
            </div>

            <div>
              <Progress
                size='sm'
                radius='sm'
                classNames={{
                  base: 'max-w-md',
                  label: 'text-xs text-slate-400',
                  value: 'text-xs text-slate-400',
                }}
                label='Usage'
                value={65}
                showValueLabel={true}
              />
            </div>

            <Divider className='bg-gray-500' />

            <User
              avatarProps={{
                src: user?.avatarUrl,
              }}
              name={user?.name}
              description={user?.email}
            />
            <Button as={Link} fullWidth href='/auth/logout' color='primary'>
              Logout
            </Button>
          </Space>
        </UserProfileContainer>
      ) : null}
    </SideNavStyled>
  )
}
