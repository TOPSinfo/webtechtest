import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import List from '../List'
import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() })

describe("List Component", () => {
    const initialState = {
        
    }

    const props = {
        
    }
    // const wrapper = mount(
    //     <KeynoteTab  {...props} />
    // );
    let wrapper: any
    beforeEach(() => {
        // const mockStore = configureStore()
        // const store = mockStore(initialState)
        wrapper = mount(
        // <Provider store={store}>
        //     <Router>
                <List  {...props} />
        //     </Router>
        // </Provider>
        );
    })
    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })
})
