import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import axios from 'axios'

@inject('appUsersStore')
@observer
export default class extends Component{

    componentDidMount(){
        this.props.appUsersStore.fetchUsers()
    }

    render(){
        const { getUserInfo } = this.props.appUsersStore
        if ( !getUserInfo.length ) return <div>nothing to display</div>

        return (
            <div>
            { 
                getUserInfo.map( user => (
                    <div key={ user.id }>
                        <p>Name: { user.name }</p>
                        <p>Email: { user.email }</p>
                        <hr />
                    </div>
                ) )
            }
            </div>
        )
    }
}