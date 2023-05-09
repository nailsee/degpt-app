import './index.less';
import {Images} from '@/assets/container'
import routerConfig from '@/routes/config';
import { Link } from 'react-router-dom';
const  Header = props => {
    return (
        <section className={'header'}>
            <header>
                <div className='logo'>
                    <img src={Images.logo} />
                    <span>Degpt </span>
                </div>
                {/* nav导航 */}
                <nav className='nav'>
                    {
                        routerConfig.map(obj=><Link key={obj.path} to={obj.path}>{obj.meta.title}</Link>)
                    }

                </nav>
            </header>
        </section>
    )
}

export default Header;