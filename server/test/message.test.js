const {expect} = require("chai");
const chaiHttp = require("chai-http");
let chai = require('chai');
chai.should();
chai.use(chaiHttp);

const { generateMessage } = require('./../utils/message')

describe("generateMessage", () => {
    it("should generate message object",() => {
        let message = generateMessage("Admin","Test Message")
        console.log(message)
        expect(message).to.be.an('Object');
        expect(message).to.have.property('from').to.equal('Admin')
        expect(message).to.have.property('text').to.equal('Test Message');  
        expect(message).to.have.property('createdAt').is.a('number'); 
    })
})