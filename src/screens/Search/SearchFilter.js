// H_0
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  H2,
  InputGroup,
  Input,
  Icon,
  List,
  ListItem,
  CheckBox,
  Button as NBButton,
} from 'native-base'
import { Images, nbTheme, Colors, GlobStyle as style } from '../../../Themes'
import { Scenes, DBColumn, Const } from '../../constants'
import { Profile, Amazon } from '../../model';
import { AppAPI } from '../../api';
import { getAgeGroup } from '../../util/Utils'
import StarsVote from '../../components/StarsVote'
import Picker, { DateModal, DatePickers, DatePickerHead } from 'react-native-modal-date-picker'
import moment from 'moment'
const { SCENES } = Scenes
const { ID } = Const

export default class SearchFilter extends Component {
  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  }

  state = {
    profile: {},
    checkedChild: -1,
    tag: [],
    checkBox: {},
    searchValue: '',
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  }

  nextStage(res){
    this.props._handleNavigate(SCENES.SearchFilter, {...this.props.route.data, cardItems: res})
  }

  constructor(props){
    super(props)
  }

  componentDidMount(){
    // Amazon.insert({[ID]: null, [DBColumn.AMAZON.name1.s()]: '333', [DBColumn.AMAZON.email1.s()]: 'eeeee'})

    Profile.queryOne('add42be0-ec79-11e6-992b-3163915b408f', null, (result, nestedFiltered)=>{
      this.state.profile = result
      // this.setTags()
      this.forceUpdate()
      // _.map(result, function(value, key) {
      //   console.log('result', key, value);
      // });
      console.log(result);
    })
    // Profile.setTestData()
  }

  clickSearch(searchWithCriteria) {
    if(true) { // if(searchWithCriteria)
      const focus = this.state.searchValue && this.state.searchValue.trim() != "*"
                    ? {focus: this.state.searchValue}
                    : null
      AppAPI.products.get( focus ? focus : null )
        .then((res) => {
          const arr = Array.from(res.data)
          // console.log('arr', res, arr)
          this.nextStage(arr)
        })
    } else {
      let focus = _.reduce(fields, function(result, value, key) {
        if(value) result.push(key);
       	return result;
      }, [])
      AppAPI.products.get({ zip: this.state.zipCode, focus })
        .then((res) => {
          this.nextStage(Array.from(res.data))
        })
    }
  }

  listItem(key, value){
    return (
      <ListItem key={key}>
        <CheckBox
          onPress={() => {
            this.setState(state => {
              state.checkBox[value] = !state.checkBox[value]
            })
          }}
          checked={this.state.checkBox[value]} />
        <Text>{value}</Text>
      </ListItem>
    )
  }

  setTags() {
    console.log(this.state.profile.child, this.state.checkedChild);
    this.state.tag = []
    if(this.state.checkedChild >= 0) {
      for(let tag of this.state.profile.child[this.state.checkedChild].tag) {
        this.state.tag.push(tag.name)
      }
    } else {
      for(let child of this.state.profile.child){
        for(let tag of child.tag) {
          this.state.tag.push(tag.name)
        }
      }
    }
  }

  checkedChild(key, value) {
    if(this.state.checkedChild === key) this.state.checkedChild = -1
    else this.state.checkedChild = key
    this.setTags()
    this.forceUpdate()
    // console.log('checkedChild', key, value.tag)
  }

  listChild(key, value) {
    return (
      <TouchableOpacity key={key} onPress={()=>this.checkedChild(key, value)}>
        <Image
          key={key}
          style={[{width: 20, height: 20, resizeMode: 'contain'},
            key!=this.state.checkedChild ? {tintColor: Colors.grey} : null
          ]}
          source={Images.avatar_circle}/>
      </TouchableOpacity>
    )
  }

  onDateChange(val){
    this.setState({date: val, ageGroup: getAgeGroup(val)})
  }

  fillList() {
    return this.state.tag.map((item, i) => this.listItem(i, item))
  }

  fillChild() {
    return _.has(this.state.profile, 'child')
      ? this.state.profile.child.map((item, i) => this.listChild(i, item))
      : null
  }

  render() {
    console.log('render', this.state.profile)

    return (
      <Container style={style.container}>
        <Header searchBar rounded>
          <InputGroup>
            <Icon name="ios-search" />
            <Input
              onChangeText={val => this.setState({searchValue: val})}
              value={this.state.searchValue}
              placeholder="Search" />
          </InputGroup>
          <NBButton transparent onPress={() => this.clickSearch(true)}>
            <Image
              style={{width: 140, resizeMode: 'contain'}}
              source={Images.logoText} />
          </NBButton>
        </Header>
        <Content
          theme={nbTheme}
          style={style.content}
          scrollEnabled={true}>
          <Card>
            <CardItem>
              <H2>
                What are you looking for?
              </H2>
              <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
                <View>
                  <TouchableOpacity onPress={() => this.picker.toggleModal()}>
                    <Text >
                      Child Age
                    </Text>
                  </TouchableOpacity>
                  <Picker
                    defaultData={moment(new Date).format('YYYY-MM-DD')}
                    onChange={(val) => this.onDateChange(val)}
                    ref={(child) => { this.picker = child }}
                    keepShowModal={true}
                    cancleText="Cancel"
                    finishText="Set"
                    title="Child Age"
                    modalColor="#000"
                    pickerHeight={400}
                    pickerColor="#fff"
                    buttonColor="#000"
                    dateTextStyle={{color:'blue'}} />
                </View>
                {this.fillChild()}
              </View>
              <Text>
                What is your focus for the child?
              </Text>
              <List>
                {this.fillList()}
              </List>

              <InputGroup>
                <Text>
                  Where are you located?
                </Text>
                <Input
                  ref={ref => this.searchInput = ref}
                  value={this.state.zipCode}
                  onChangeText={val => this.setState({zipCode: val})}
                  placeholder="Zip Code" />
              </InputGroup>
            </CardItem>
            <NBButton block onPress={() => this.clickSearch(false)}> SEARCH </NBButton>
          </Card>
        </Content>
      </Container>
    )
  }
}
