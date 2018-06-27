
import React from 'react'
import Typography from '@material-ui/core/Typography'
// import Sort from '@material-ui/icons/Sort'
// import IconButton from '@material-ui/core/IconButton'
// import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    display: 'flex',
    flex: '1 0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

const BarcosHeader = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="title" color="inherit" noWrap>
      Barcos
    </Typography>
    {/* <Hidden mdUp>
      <IconButton color="inherit" className={classes.button} aria-label="Ordenar">
        <Sort />
      </IconButton>
    </Hidden> */}
  </div>
)

export default withStyles(styles)(BarcosHeader)

// const mapStateToProps = ({ data, controller }) => ({
//   tiposBarcos: data.immutable.tiposBarcos,
//   controller: controller.barcos.formDialog,
// })

// const BarcosHeaderEnhanced = withStyles(styles)(BarcosHeader)
// export default connect(mapStateToProps, actions)(BarcosHeaderEnhanced)
