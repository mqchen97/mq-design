import React from 'react';
import Button from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', height: 64 }}>
          <section style={{ flexBasis: '16.666667%' }}>
            <h2>Demo</h2>
          </section>
          <section>
            <Menu>
              <MenuItem>
                menu item1
              </MenuItem>
              <MenuItem>
                menu item2
              </MenuItem>
              <SubMenu title='submenu 1'>
                <MenuItem>
                  menu item1
                </MenuItem>
                <MenuItem>
                  menu item2
                </MenuItem>
              </SubMenu>
              <MenuItem>
                menu item3
              </MenuItem>
            </Menu>
          </section>
        </div>
      </header>
      <main style={{ display: 'flex', marginTop: 40 }}>
        <section style={{ flexBasis: '16.666667%' }}>
          <Menu mode='vertical' defaultOpenSubMenus={['2']}>
            <MenuItem>
              menu item1
            </MenuItem>
            <MenuItem disabled>
              menu item2
            </MenuItem>
            <SubMenu title='submenu 1'>
              <MenuItem>
                dropdown 1
              </MenuItem>
              <MenuItem>
                dropdown 2
              </MenuItem>
            </SubMenu>
            <MenuItem>
              menu item3
            </MenuItem>
          </Menu>
        </section>
        <div style={{ marginLeft: 40 }}>
          <article>
            <section>
              <Button disabled={true}>禁用</Button>
              <Button>默认</Button>
              <Button level='link' size='lg' onClick={() => { alert('hello') }}>link</Button>
              <Button level='primary'>primary</Button>
              <Button level='danger'>danger</Button>
              <Button size='sm'>small</Button>
              <Button size='lg'>large</Button>
            </section>
          </article>
        </div>
      </main>

    </div>
  );
}

export default App;
