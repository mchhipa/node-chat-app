const {expect} = require("chai");
const chaiHttp = require("chai-http");
let chai = require('chai');
chai.should();
chai.use(chaiHttp);

const { generateMessage,generateLocationMessage } = require('./../utils/message')

describe("generateMessage", () => {
    it("should generate message object",() => {
        let message = generateMessage("Admin","Test Message")
        console.log(message)
        expect(message).to.be.an('Object');
        expect(message).to.have.property('from').to.equal('Admin')
        expect(message).to.have.property('text').to.equal('Test Message');  
        expect(message).to.have.property('createdAt').is.a('number'); 
    })
});
describe("generateLocationMessage", () => {
    it("should generate message object",() => {
        let lat = 24.787891;
        let lng = 46.7540871;
        let message = generateLocationMessage("Admin",lat,lng)
       // console.log(message)
        expect(message).to.be.an('Object');
        expect(message).to.have.property('from').to.equal('Admin')
        let url =`https://www.google.com/maps?q=${lat},${lng}`;
        expect(message).to.have.property('url').to.equal(url);  
        expect(message).to.have.property('createdAt').is.a('number'); 
    })
})