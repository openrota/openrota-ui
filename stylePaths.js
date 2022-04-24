const path = require('path');
module.exports = {
  stylePaths: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/@data-driven-forms/pf4-component-mapper'),
    path.resolve(__dirname, 'node_modules/react-datetime-picker/dist/DateTimePicker.css'),
    path.resolve(__dirname, 'node_modules/react-clock/dist/Clock.css'),
    path.resolve(__dirname, 'node_modules/react-calendar/dist/Calendar.css'),
    path.resolve(__dirname, 'node_modules/react-calendar-timeline/lib/Timeline.css'),
  ]
}
