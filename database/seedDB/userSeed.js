const mongoose = require('mongoose');
const User = require('../models/UserModel');

    const user1 = new User({
    email: 'user1@mike.com',
    password: 'qwerty',
    username: 'user1',
    userType: 'customer',
    bio: 'test test',
    kitchen_name: 'user1 place',
    menu: null,
    cusine: null,
    market_enabled: false,
    address: null
    });

    const user2 = new User({
        email: 'user2@mike.com',
        password: 'qwerty',
        username: 'user2',
        userType: 'customer',
        bio: 'test test',
        kitchen_name: 'user2 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user3 = new User({
        email: 'user3@mike.com',
        password: 'qwerty',
        username: 'user3',
        userType: 'kitchen',
        bio: 'test test',
        kitchen_name: 'user3 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user4 = new User({
        email: 'user4@mike.com',
        password: 'qwerty',
        username: 'user4',
        userType: 'customer',
        bio: 'test test',
        kitchen_name: 'user4 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user5 = new User({
        email: 'user5@mike.com',
        password: 'qwerty',
        username: 'user5',
        userType: 'kitchen',
        bio: 'test test',
        kitchen_name: 'user5 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user6 = new User({
        email: 'user6@mike.com',
        password: 'qwerty',
        username: 'user6',
        userType: 'customer',
        bio: 'test test',
        kitchen_name: 'user6 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user7 = new User({
        email: 'user7@mike.com',
        password: 'qwerty',
        username: 'user7',
        userType: 'kitchen',
        bio: 'test test',
        kitchen_name: 'user7 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user8 = new User({
        email: 'user8@mike.com',
        password: 'qwerty',
        username: 'user8',
        userType: 'customer',
        bio: 'test test',
        kitchen_name: 'user8 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user9 = new User({
        email: 'user9@mike.com',
        password: 'qwerty',
        username: 'user9',
        userType: 'kitchen',
        bio: 'test test',
        kitchen_name: 'user9 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

    const user10 = new User({
        email: 'user10@mike.com',
        password: 'qwerty',
        username: 'user10',
        userType: 'customer',
        bio: 'test test',
        kitchen_name: 'user10 place',
        menu: null,
        cusine: null,
        market_enabled: false,
        address: null
    });

const userseedDB = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]

module.exports = userseedDB;