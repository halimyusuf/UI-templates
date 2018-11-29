const Request = require('request');


describe('Test route redflags records and users', () => {
  let server;
  beforeAll(() => {
    server = require('../app');
  });
  afterAll(() => {
    server.close();
  });


  describe('GET /red-flags', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/red-flags', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('test for id type to be a number', () => {
      expect(typeof data.body.data[0].AllRedflag[0].id).toBe('number');
    });
    it('test for post type to be a string', () => {
      expect(typeof data.body.data[0].AllRedflag[0].type).toBe('string');
    });
    it('test for location type to be a string', () => {
      expect(typeof data.body.data[0].AllRedflag[0].location).toBe('string');
    });
    it('test for comment type to be a string', () => {
      expect(typeof data.body.data[0].AllRedflag[0].comment).toBe('string');
    });
    it('test for status type to be a string', () => {
      expect(typeof data.body.data[0].AllRedflag[0].status).toBe('string');
    });
  });


  describe('GET specific red-flag records', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/red-flags/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('test for id type to be a number', () => {
      expect(typeof data.body.data[0].id).toBe('number');
    });
    it('test for post type to be a string', () => {
      expect(typeof data.body.data[0].type).toBe('string');
    });
    it('test for location type to be a string', () => {
      expect(typeof data.body.data[0].location).toBe('string');
    });
    it('test for comment type to be a string', () => {
      expect(typeof data.body.data[0].comment).toBe('string');
    });
    it('test for status type to be a string', () => {
      expect(typeof data.body.data[0].status).toBe('string');
    });
  });


  describe('Testing post request to create red-flags', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/red-flags',
        {
          form: {
            title: 'This is the title',
					    story: 'This is just the title stiory',
					    location: '2.344 55.223',
            createdBy: 1,
          },
        },
				 (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 200', () => {
      expect(status).toBe(200);
    });
  });


  describe('should return 400 if title is not specified,not type string and length is less than 3 ', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/red-flags',
        {
          form: {
            title: 1,
            story: 'This is just the title stiory',
            location: '2.344 55.223',
            createdBy: 1,
          },
        },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 400', () => {
      expect(status).toBe(400);
    });
  });

  describe('should return 400 if story is not specified,not type string and length is less than 15 ', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/red-flags',
        {
          form: {
            title: 'this is a title',
            story: 'this is astory',
            location: '2.344 55.223',
            createdBy: 1,
          },
        },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 400', () => {
      expect(status).toBe(400);
    });
  });


  describe('should return 400 if location is not specified,not type \'string\' and length is less than 3 ', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/red-flags',
        {
          form: {
            title: 'this is a title',
            story: 'This is just the title stiory',
            location: '',
            createdBy: 1,
          },
        },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 400', () => {
      expect(status).toBe(400);
    });
  });


  describe('should return 404 if \'createdBy\' is not createdBy is not type number and a valid user id', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/red-flags',
        {
          form: {
            title: 'This is the title',
            story: 'This is just the title stiory',
            location: '2.344 55.223',
            createdBy: 2,
          },
        },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 404', () => {
      expect(status).toBe(404);
    });
  });


  describe('expects status 200 if comment has been successfully updated', () => {
    beforeAll((done) => {
      Request.put('http://localhost:3000/api/v1/red-flags/1/comment',
        { form: { comment: 'This is a comment' } },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 200', () => {
      expect(status).toBe(200);
    });
  });


  describe('should return 400 if comment is not specified or lenght is not up to 1', () => {
    beforeAll((done) => {
      Request.put('http://localhost:3000/api/v1/red-flags/1/comment',
        { form: { comment: '' } },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 400', () => {
      expect(status).toBe(400);
    });
  });


  describe('Testing update/patch request for records(only owner of record is allowed)', () => {
    beforeAll((done) => {
      Request.put('http://localhost:3000/api/v1/red-flags/1/comment/1',
        { form: { comment: 'This is a new comment' } },
				 (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 200', () => {
      expect(status).toBe(200);
    });
  });


  describe('Testing if record has been successfully updated', () => {
    beforeAll((done) => {
      Request.put('http://localhost:3000/api/v1/red-flags/1/location',
        { form: { location: '30.23 65.22' } },
				 (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 200', () => {
      expect(status).toBe(200);
    });
  });


  describe('should return 400 if location is not specified or not type string', () => {
    beforeAll((done) => {
      Request.put('http://localhost:3000/api/v1/red-flags/1/location',
        { form: { location: '' } },
        (error, response, body) => {
          status = response.statusCode;
          done();
        });
    });
    it('status 400', () => {
      expect(status).toBe(400);
    });
  });


  describe('Testing update/patch request for records(only owner of record is allowed)', () => {
    const data4 = {};
    beforeAll((done) => {
      Request.put('http://localhost:3000/api/v1/red-flags/1/location/1',
        { form: { location: '30.23 65.22' } },
        (error, response, body) => {
          data4.status = response.statusCode;
          data4.body = JSON.parse(body);
          done();
        });
    });
    it('status 200', () => {
      expect(data4.status).toBe(200);
    });
  });


  describe('POST /create-user', () => {
    const data = {};
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/create-user', {
        form:
				{
				  firstname: 'halim',
				  lastname: 'yusuf',
				  othernames: 'olamilekan',
				  email: 'haleemyoosuph@gmail.com',
				  phoneNumber: '07023115003',
				  username: 'halimyusuf',
				},
      }, (error, response, body) => {
        status = response.statusCode;
        done();
      });
    });
    it('status 200', () => {
      expect(status).toBe(200);
    });
  });
});
