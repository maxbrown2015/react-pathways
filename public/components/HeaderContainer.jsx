
import React from 'react';
import '../styles/HeaderContainer.css';
import Flexbox from 'flexbox-react';
import Fade from 'react-reveal/Fade';

const title = 'PATHWAYS ';
const subtitle = 'An Interactive Guide to the Penn History Department\'s Undergraduate Course Offerings'


class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  render() {
    return <Flexbox width={'100vw'} height={'140vh'} alignItems={'center'} justifyContent='center' className='HeaderContainer' flexDirection={"column"}>
    <Flexbox flexDirection='column' alignItems={'center'} justifyContent='center' height='120vh' width={'100%'}>
      <Flexbox className="PageTitle" margin={'50px'}>{title} </Flexbox>
      <Flexbox className="PageSubtitle" margin={'50px'} >{subtitle}</Flexbox>
    </Flexbox>
    <div  className='PageIntroContainer' height='20vh' width={'100%'}  >
      <Fade big>
        <div className='PageIntro'   >
          {'Quisque luctus rutrum varius. Aenean ac placerat ipsum. Vivamus cursus, massa egestas dictum sollicitudin, elit nulla interdum dui, a blandit odio lacus sed ipsum. Ut lorem mauris, varius sed congue sed, efficitur sit amet erat. Integer lorem metus, varius non pellentesque pretium, bibendum a augue.'}
        </div>
      </Fade>
    </div>
    </Flexbox>
  }
} 

export default HeaderContainer;
