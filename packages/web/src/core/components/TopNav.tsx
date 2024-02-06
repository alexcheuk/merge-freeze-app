import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  User,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useAuth } from '../providers/AuthProvider'
import { NavLink } from 'react-router-dom'

export const TopNav = () => {
  const { isLoggedIn, isLoading, user } = useAuth()

  return (
    <Navbar>
      <NavbarBrand>
        <code className='font-extrabold text-2xl'>/mf</code>
      </NavbarBrand>
      <NavbarContent
        className='hidden sm:flex gap-4'
        justify='center'
      ></NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          {isLoggedIn ? (
            <Button
              as={NavLink}
              to={'/manage'}
              color='default'
              isLoading={isLoading}
              variant='bordered'
            >
              Go to Application
            </Button>
          ) : null}
        </NavbarItem>
        <NavbarItem>
          {!isLoggedIn ? (
            <Button
              as={Link}
              href='/auth/github'
              color='primary'
              isLoading={isLoading}
              startContent={
                !isLoading ? (
                  <svg
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                    aria-hidden='true'
                    focusable='false'
                    tabIndex={-1}
                  >
                    <path
                      clipRule='evenodd'
                      d='M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z'
                      fill='currentColor'
                      fillRule='evenodd'
                    ></path>
                  </svg>
                ) : null
              }
            >
              Sign in with Github
            </Button>
          ) : (
            <Dropdown>
              <DropdownTrigger>
                <User
                  avatarProps={{
                    src: user?.avatarUrl,
                  }}
                  name={user?.name}
                  description={user?.email}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label='Static Actions'>
                <DropdownItem key='new'>Configure</DropdownItem>
                <DropdownItem href='/auth/logout' key='logout'>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
