import {
  VirtualizedList,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TextInputMaterial from '../textInputMaterial';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { db } from '../../config/db';
var Constants = require('../../config/Constants')
import styleConstructor from './style';
import eventStyle from './eventStyle'

import DayView from './DayView';
import { Actions } from 'react-native-router-flux';

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);

    const start = props.start ? props.start : 0;
    const end = props.end ? props.end : 24;

    this.styles = styleConstructor(props.styles, (end - start) * 100);
    this.state = {
      date: moment(this.props.initDate),
      index: this.props.size,
      modalVisible: false,
      title: '',
      summary: '',
      start: moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss'),
      end: moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss'),
      startChosenDate: moment().utcOffset('+05:30').format('MMMM-DD'),
      endChosenDate: moment().utcOffset('+05:30').format('MMMM-DD'),
      isStartVisible: false,
      isEndVisible: false,
    };
  }

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: 'DD MMMM YYYY',
  };

  _getItemLayout(data, index) {
    const { width } = this.props;
    return { length: width, offset: width * index, index };
  }

  _getItem(events, index) {
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      'days'
    );
    return _.filter(events, event => {
      const eventStartTime = moment(event.start);
      return (
        eventStartTime >= date.clone().startOf('day') &&
        eventStartTime <= date.clone().endOf('day')
      );
    });
  }

  _renderItem({ index, item }) {
    const {
      width,
      format24h,
      initDate,
      scrollToFirst = true,
      start = 0,
      end = 24,
      formatHeader,
      upperCaseHeader = false,
    } = this.props;
    const date = moment(initDate).add(index - this.props.size, 'days');

    const leftIcon = this.props.headerIconLeft ? (
      this.props.headerIconLeft
    ) : (
        <Image source={require('./back.png')} style={this.styles.arrow} />
      );
    const rightIcon = this.props.headerIconRight ? (
      this.props.headerIconRight
    ) : (
        <Image source={require('./forward.png')} style={this.styles.arrow} />
      );

    let headerText = upperCaseHeader
      ? date.format(formatHeader || 'DD MMMM YYYY').toUpperCase()
      : date.format(formatHeader || 'DD MMMM YYYY');

    return (
      <View style={[this.styles.container, { width }]}>
        <View style={this.styles.header}>
          <TouchableOpacity
            style={this.styles.arrowButton}
            onPress={this._previous}
          >
            {leftIcon}
          </TouchableOpacity>
          <View style={this.styles.headerTextContainer}>
            <Text style={this.styles.headerText}>{headerText}</Text>
          </View>
          <TouchableOpacity
            style={this.styles.arrowButton}
            onPress={this._next}
          >
            {rightIcon}
          </TouchableOpacity>

        </View>
        <DayView
          date={date}
          index={index}
          format24h={format24h}
          formatHeader={this.props.formatHeader}
          headerStyle={this.props.headerStyle}
          renderEvent={this.props.renderEvent}
          eventTapped={this.props.eventTapped}
          events={item}
          width={width}
          styles={this.styles}
          scrollToFirst={scrollToFirst}
          start={start}
          end={end}
        />
      </View>
    );
  }

  _goToPage(index) {
    if (index <= 0 || index >= this.props.size * 2) {
      return;
    }
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      'days'
    );
    this.refs.calendar.scrollToIndex({ index, animated: false });
    this.setState({ index, date });
  }

  _goToDate(date) {
    const earliestDate = moment(this.props.initDate).subtract(
      this.props.size,
      'days'
    );
    const index = moment(date).diff(earliestDate, 'days');
    this._goToPage(index);
  }

  _previous = () => {
    this._goToPage(this.state.index - 1);
    if (this.props.dateChanged) {
      this.props.dateChanged(
        moment(this.props.initDate)
          .add(this.state.index - 1 - this.props.size, 'days')
          .format('YYYY-MM-DD')
      );
    }
  };

  _next = () => {
    this._goToPage(this.state.index + 1);
    if (this.props.dateChanged) {
      this.props.dateChanged(
        moment(this.props.initDate)
          .add(this.state.index + 1 - this.props.size, 'days')
          .format('YYYY-MM-DD')
      );
    }
  };
  handleSaveButton = () => {
    const { title, summary, start, end } = this.state;
    if (title == '' || summary == '')
        Alert.alert('Alert', 'title or summary is empty');
    else {
        const uid = 'CM7BJ7OyWXhGyDwLX1DMqabWfY42';
        db.ref('/appointmentData').child(uid).push({ title: title, summary: summary, start: start, end: end })
            .then(() => console.log('Data set.'))
            .catch((error) => {
                console.log('error ', error)
            });
        Alert.alert('SAVED');
        this.toggleModal(!this.state.modalVisible)
    }
}
renderSaveButton() {
    return (
        <View style={eventStyle.registerSumbitButtonView}>
            <TouchableOpacity
                style={eventStyle.saveButton}
                onPress={() => this.handleSaveButton(this)}
                activeOpacity={1}>
                {}
                <Text
                    style={eventStyle.registerSubmitButtonText}>
                    {'Save'}
                </Text>
            </TouchableOpacity>
            <View style={eventStyle.registerBackButonView}>
                <TouchableOpacity onPress={() => {
                     this.toggleModal(!this.state.modalVisible)}}>
                    <Text style={eventStyle.registerBackButonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

handleStartConfirm = (date) => {
    this.setState({
        startChosenDate: moment(date).format('MMMM-DD'),
        start: moment(date).format('YYYY-MM-DD HH:mm:ss')
    });
    this.hideDatePicker();
}

showStartDatePicker = () => {
    this.setState({ isStartVisible: true });
}

hideStartDatePicker = () => {
    this.setState({ isStartVisible: false })
}

handleEndConfirm = (date) => {
    this.setState({
        endChosenDate: moment(date).format('MMMM-DD'),
        end: moment(date).format('YYYY-MM-DD HH:mm:ss')
    });
    this.hideDatePicker();
}

showEndDatePicker = () => {
    this.setState({ isEndVisible: true });
}

hideEndDatePicker = () => {
    this.setState({ isEndVisible: false })
}

renderEventForm() {
    return (
        <KeyboardAvoidingView
            behavior="height"
            style={eventStyle.validFormViewContainer}>
            <ScrollView style={eventStyle.inputWrapper}>
                <View style={eventStyle.validFormSubView}>
                    <View style={eventStyle.firstFieldView}>
                        <TextInputMaterial
                            blurText={this.state.title}
                            refsValue={Constants.TEXT_INPUT_TITLE}
                            ref={Constants.TEXT_INPUT_TITLE}
                            label={Constants.LABEL_TITLE}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={title => this.setState({ title })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={styles.input}
                            placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.title}
                            textInputName={this.state.title}
                            errorText={Constants.ERROR_TEXT_INPUT_TITLE}
                            underlineHeight={2}
                            keyboardType="email-address"
                            onSubmitEditing={event => {
                                this.refs.eventInputSummary.focus();
                            }}
                        />
                    </View>
                    <View style={eventStyle.validFormSecondFieldView}>
                        <TextInputMaterial
                            blurText={this.state.summary}
                            refsValue={Constants.TEXT_INPUT_SUMMARY}
                            ref={Constants.TEXT_INPUT_SUMMARY}
                            label={Constants.LABEL_SUMMARY}
                            maxLength={100}
                            autoCapitalize={'none'}
                            onChangeText={summary => this.setState({ summary })}
                            returnKeyType={'next'}
                            autoCorrect={false}
                            isLoginScreen={false}
                            style={styles.input}
                            placeholderTextColor={Constants.PLACEHOLDER_TEXT_COLOR}
                            underlineColorAndroid={Constants.UNDERLINE_COLOR_ANDROID}
                            value={this.state.summary}
                            textInputName={this.state.summary}
                            errorText={Constants.ERROR_TEXT_INPUT_SUMMARY}
                            underlineHeight={2}
                            keyboardType="email-address"

                        />
                    </View>
                    <View style={{ paddingLeft: 10, flexDirection: 'row', }}>
                        <View style={{ flex: 1 / 2 }}>

                            <TouchableOpacity style={eventStyle.datePicker} onPress={this.showStartDatePicker} >
                                <Text>Start Date</Text>
                                <Text style={eventStyle.datePickerText}>{this.state.startChosenDate}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={this.state.isStartVisible}
                                mode="datetime"
                                onConfirm={this.handleStartConfirm}
                                onCancel={this.hideStartDatePicker}
                                is24Hour={true}
                            />
                        </View>
                        <View style={{ flex: 1 / 2, flexDirection: 'row-reverse', }}>
                            <TouchableOpacity style={eventStyle.datePicker} onPress={this.showEndDatePicker} >
                                <Text>End Date</Text>
                                <Text style={eventStyle.datePickerText}>{this.state.endChosenDate}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={this.state.isEndVisible}
                                mode="datetime"
                                onConfirm={this.handleEndConfirm}
                                onCancel={this.hideEndDatePicker}
                                is24Hour={true}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>

        </KeyboardAvoidingView>

    );
}

  render() {
    const {
      width,
      virtualizedListProps,
      events,
      initDate,
    } = this.props;

    return (
      <View style={[this.styles.container, { width }]}>
        <Modal animationType={"slide"} transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
             <ScrollView scrollEnabled={false} overScrollMode={'always'} keyboardShouldPersistTaps={'handled'} style={eventStyle.renderContainer}>
                
                {this.renderEventForm()}
                {this.renderSaveButton()}

            </ScrollView>
        </Modal>
        <VirtualizedList
          ref="calendar"
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={this.props.size}
          data={events}
          getItemCount={() => this.props.size * 2}
          getItem={this._getItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this._getItemLayout.bind(this)}
          horizontal
          pagingEnabled
          renderItem={this._renderItem.bind(this)}
          style={{ width: width }}
          onMomentumScrollEnd={event => {
            const index = parseInt(event.nativeEvent.contentOffset.x / width);
            const date = moment(this.props.initDate).add(
              index - this.props.size,
              'days'
            );
            if (this.props.dateChanged) {
              this.props.dateChanged(date.format('YYYY-MM-DD'));
            }
            this.setState({ index, date });
          }}
          {...virtualizedListProps}
        />
        <TouchableOpacity style={{
          position: 'absolute',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
        }} onPress={() => this.toggleModal(true)}>
          <Image source={require('../../public/images/Floating_Button.png')}
            style={{ resizeMode: 'contain', width: 50, height: 50, }}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}