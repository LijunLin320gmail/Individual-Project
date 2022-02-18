const expect = require("chai"),expect;
const request = require("request");

describe("modal",()=>{
    const url = "http://localhost8080";
    
    it("requests show uploads code 200",(done) =>{
    request(url,(err,res,body)=>{
        expect(res.statusCode).to.equal(200);
        done();
    });
  });



});