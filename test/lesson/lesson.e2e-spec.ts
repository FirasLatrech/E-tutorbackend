import request from 'supertest';
import { APP_URL } from '../utils/constants';

describe('Lesson Module', () => {
  const app = APP_URL;
  const newLessonTitle = `New Lesson ${Date.now()}`;
  const newLessonDescription = `Description for New Lesson ${Date.now()}`;

  describe('Create Lesson', () => {
    it('should successfully create a new lesson: /api/v1/lesson (POST)', () => {
      return request(app)
        .post('/api/v1/lesson')
        .send({
          title: newLessonTitle,
          description: newLessonDescription,
        })
        .expect(201);
    });
  });

  describe('Retrieve Lessons', () => {
    it('should retrieve all lessons: /api/v1/lesson (GET)', async () => {
      const response = await request(app).get('/api/v1/lesson').expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should retrieve a specific lesson: /api/v1/lesson/:id (GET)', async () => {
      const lessonsResponse = await request(app)
        .get('/api/v1/lesson')
        .expect(200);

      const lessonId = lessonsResponse.body[0].id;

      return request(app).get(`/api/v1/lesson/${lessonId}`).expect(200);
    });

    it('should retrieve lessons of a specific chapter: /api/v1/lesson/chapter/:id (GET)', async () => {
      const chaptersResponse = await request(app)
        .get('/api/v1/chapter')
        .expect(200);

      const chapterId = chaptersResponse.body[0].id;

      return request(app)
        .get(`/api/v1/lesson/chapter/${chapterId}`)
        .expect(200);
    });
  });

  describe('Delete Lesson', () => {
    it('should delete a specific lesson: /api/v1/lesson/:id (DELETE)', async () => {
      const lessonsResponse = await request(app)
        .get('/api/v1/lesson')
        .expect(200);

      const lessonId = lessonsResponse.body[0].id;

      return request(app).delete(`/api/v1/lesson/${lessonId}`).expect(204);
    });
  });
});
