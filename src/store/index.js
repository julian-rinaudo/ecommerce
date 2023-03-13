import {configureStore} from '@reduxjs/toolkit'
import ShoppingStore from './shopping/ShoppingStore'

export default configureStore({
    reducer:{
        ShoppingStore: ShoppingStore
    }
})