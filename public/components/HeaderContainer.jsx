
import React from 'react';
import '../styles/HeaderContainer.css';
import Flexbox from 'flexbox-react';

const title = 'PATHWAYS';
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
    return <Flexbox width={'100vw'} height={'70vh'} alignItems={'center'} className='HeaderContainer' flexDirection={"column"}>
    <Flexbox className="PageTitle" margin={'50px'}>{title} </Flexbox>
    <Flexbox className="PageSubtitle" margin={'50px'}>{subtitle}</Flexbox>
    </Flexbox>
  }
} 

export default HeaderContainer;
