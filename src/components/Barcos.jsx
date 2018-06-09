// import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as barcosAction from './../actions/BarcosAction'

// export class BarcoListContainer extends React.Component {
//   constructor() {
//     super()
//     this.state = { isGrouped: false }
//   }

//   componentDidMount() {
//     this.props.action.getBarcosAction()
//       .catch((error) => {
//         // toastr.error(error)
//         console.error(error)
//       })
//   }

//   getBarcosByGroup = barcos => _.groupBy(barcos, barco => (barco.groupId ? barco.groupId : 'Ungrouped'))

//   handleAdd = () => {
//     this.props.history.push('/barcos')
//   }

//   handleEdit = (barco) => {
//     if (barco.id) {
//       this.setState({ selectedBarcoId: undefined })
//       this.props.history.push(`/barcos/${barco.id}`)
//     }
//   }

//   handleDelete = (barco) => {
//     if (barco.id) {
//       this.setState({ selectedBarcoId: undefined })
//       this.props.action.deleteBarcoAction(barco.id)
//         .catch((error) => {
//           // toastr.error(error)
//           console.error(error)
//         })
//     }
//   }

//   handleSwitchGrouping = () => {
//     this.setState({ isGrouped: !this.state.isGrouped })
//     console.log('switch grouping')
//   }

//   render() {
//     const { barcos } = this.props
//     const { isGrouped } = this.state
//     const barcosByGroup = isGrouped && this.getBarcosByGroup(barcos)

//     if (!barcos) {
//       return (
//         <div>Loading...</div>
//       )
//     }

//     return (
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

//         {
//           !isGrouped &&
//           <Card
//             style={{
//               margin: 20,
//               order: 2,
//               flex: '1 100%',
//               maxWidth: 1024,
//             }}
//           >
//             <CardHeader
//               title="All Barcos"
//               subtitle={
//                 <Switch
//                   toggled={false}
//                   onToggle={this.handleSwitchGrouping}
//                   labelPosition="right"
//                   label="Grouping"
//                 />
//               }
//             />
//             <SmartTable {...{
//               tableHeaders,
//               data: barcos,
//               onEdit: this.handleEdit,
//               onDelete: this.handleDelete,
//             }}
//             />
//           </Card>
//         }

//         {
//           isGrouped &&
//           (Object.keys(barcosByGroup).map((groupName, index) => (
//             <Card
//               key={index}
//               style={{
//                 margin: 20,
//                 order: 2,
//                 flex: '1 100%',
//                 maxWidth: 1024,
//               }}
//             >
//               <CardHeader
//                 title={groupName}
//                 subtitle={
//                   <Switch
//                     toggled
//                     onToggle={this.handleSwitchGrouping}
//                     labelPosition="right"
//                     label="Grouping"
//                   />
//                 }
//               />
//               <SmartTable {...{
//                 tableHeaders,
//                 data: barcosByGroup[groupName],
//                 onEdit: this.handleEdit,
//                 onDelete: this.handleDelete,
//               }}
//               />
//             </Card>
//           )))
//         }

//         <Button
//           variant="fab"
//           onTouchTap={this.handleAdd}
//           secondary
//           style={{
//             position: 'fixed',
//             top: 80,
//             right: 30,
//             zIndex: 9999,
//           }}
//         >
//           <AddIcon />
//         </Button>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   barcos: state.data.barcos,
// })

// const mapDispatchToProps = dispatch => ({
//   action: bindActionCreators(barcosAction, dispatch),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(BarcoListContainer)


import React from 'react';
import Typography from '@material-ui/core/Typography';

export default () => (
  <Typography noWrap>Barcos</Typography>
)
