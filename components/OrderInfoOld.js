import React, { Component, PropTypes} from 'react'

export default class OrderInfo extends Component {
  constructor(props) {
    super(props)
   
  }
  componentWillReceiveProps(_, nextContext) {
    const form = nextContext.orders.form
    const attrs = [ 'first_name', 'last_name', 'email', 'address', 'payment', 'discount_key']
 console.log(nextContext.orders.form.type)
    if (nextContext.orders.form.type!='new') {

      attrs.forEach(attr => {
        this.refs[attr].value = form[attr]
        console.log("yes")
        console.log(attr)
      })
    }
  }
  render() {
    const { products, orders, submitForm } = this.context
    const _payload = orders.allpay.payload ? orders.allpay.payload : {}
    const disabled = orders.form.type=='show' ? 'disabled' : ''
    const order_name = orders.form.type=='new' ? '新增訂單' : `訂單 ${orders.form.id}`

    let submit_btn
    let allpay_form
    
    switch(orders.form.type) {
      case 'show':
        submit_btn = <div/>
        allpay_form = <div/>
        break
      default:
        submit_btn =  <input className='btn btn-success' type='submit' value='確定' />
        allpay_form = <form id='allpay' action={orders.allpay.url} method='post' style={{display: 'none'}}>
            信用卡測試卡號: 4311-9522-2222-2222<br/>
            信用卡測試安全碼: 222<br/>
            信用卡測試有效年月: 設定在未來時間即可<br/>
            {
              Object.keys(_payload).map( (key, i) => {
                return  <input key={i} type="text" name={key} defaultValue={_payload[key]} />
              })
            }
          </form>
        break
    }

    return (
      <div className='row'>
      {order_name}
        <div className='col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1 orderinfo-form'>
          <form onSubmit={ e => {
                e.preventDefault()
                submitForm(orders.form.type, 'orders', null, {
                  last_name: this.refs.last_name.value,
                  first_name: this.refs.first_name.value,
                  email: this.refs.email.value,
                  address: this.refs.address.value,
                  payment: this.refs.payment.value,
                  discount_key: this.refs.discount_key.value
                })
              }}>
              <div className="col-xs-12 form-line">
                <label className='col-xs-6 orderinfo-form-label'>姓<span style={{color: 'red'}}>*</span></label>
                <input className='col-xs-6 orderinfo-form-input' ref='last_name' type='text' name='last_name' disabled={disabled} />
              </div>
              <div className="col-xs-12 form-line">
                <label className='col-xs-6 orderinfo-form-label'>名<span style={{color: 'red'}}>*</span></label>
                <input className='col-xs-6 orderinfo-form-input' ref='first_name' type='text' name='first_name' disabled={disabled} />
              </div>
              <div className="col-xs-12 form-line">
                 <label className='col-xs-6 orderinfo-form-label'>付款方式<span style={{color: 'red'}}>*</span></label>
              <select className='col-xs-6 orderinfo-form-input' ref='payment' name='payment' disabled={disabled}>
                <option value='Credit'>信用卡</option>
                <option value='CVS'>超商代碼</option>
                <option value='ATM'>ATM</option>
              </select>
              </div>
              <div className="col-xs-12 form-line">
                <label className='col-xs-6 orderinfo-form-label'>信箱<span style={{color: 'red'}}>*</span></label>
                <input className='col-xs-6 orderinfo-form-input' ref='email' type='text' name='email' disabled={disabled} />
              </div>
              <div className="col-xs-12 form-line">
                <label className='col-xs-6 orderinfo-form-label'>運送地址<span style={{color: 'red'}}>*</span></label>
                <input className='col-xs-6 orderinfo-form-input' ref='address' type='text' name='address' disabled={disabled} />
              </div>
              <div className="col-xs-12 form-line">
                <label className='col-xs-6 orderinfo-form-label'>折扣代碼</label>
                <input className='col-xs-6 orderinfo-form-input' ref='discount_key' type='text' name='discount_key' disabled={disabled} />
              </div>
            { submit_btn }
          </form>
          { allpay_form }
        </div>
      </div>
    )
  }
}

OrderInfo.contextTypes = {
  products: PropTypes.array.isRequired,
  orders: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired
}

