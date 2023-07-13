import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { Icon } from '@iconify/react';
import { Popup } from '../components/Popup';
import profile from '../assets/profile.jpeg';

export const RestaurantDetail = () => {
  const { rId } = useParams();
  const { state, dispatch } = useContext(RecipeContext);
  const [toggle, setToggle] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const restaurant = state?.allRestaurant?.find((r) => r.id == rId);

  const handleAddReview = () => {
    if (review.comment !== '' || review.rating !== 0) {
      const newReview = {
        revName: 'Priyanshu Singh',
        pp: profile,
        comment: review.comment,
        rating: review.rating,
      };
      dispatch({
        type: 'UPDATE_RESTAURANTS',
        payload: state.allRestaurant.map((r) =>
          r.id == rId ? { ...r, ratings: [...r.ratings, newReview] } : r,
        ),
      });
      setReview({ rating: 0, comment: '' });
    } else {
      window.alert('please fill proper field');
    }
  };

  const newAvg =
    restaurant.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
    restaurant.ratings.length;
  return (
    <div>
      <div style={{ textAlign: 'left', padding: '20px' }}>
        <Link
          to="/"
          style={{
            color: 'black',
          }}
        >
          <Icon icon="icon-park-twotone:left-two" width="30" height="30" />
        </Link>
      </div>
      <div>
        <div style={{ textAlign: 'left', width: '60%', margin: 'auto' }}>
          <p style={{ fontSize: '52px', margin: '0' }}>{restaurant?.name}</p>
          <div
            style={{
              color: 'gray',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ margin: '0' }}>
                {restaurant.menu.map((item) => item.name).join(',  ')}
              </p>
              <p style={{ margin: '0' }}>{restaurant.address}</p>
              <p style={{ margin: '0' }}>Average Rating: {newAvg.toFixed(1)}</p>
            </div>
            <button
              style={{
                height: '40px',
                border: '0',
                padding: '5px',
                backgroundColor: 'red',
                color: 'white',
                width: '100px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setToggle(true)}
            >
              Add review
            </button>
          </div>
          <div style={{ borderBottom: '1px solid gray' }}></div>
          <div>
            <h2>Reviews</h2>
            {restaurant.ratings.map(
              ({ rating, comment, pp, revName }, index) => (
                <>
                  <p
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                      }}
                    >
                      <img
                        src={pp}
                        style={{
                          borderRadius: '50% 50%',
                          width: '30px',
                          height: '30px',
                        }}
                      />{' '}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <b>{revName}</b>
                        <div
                          style={{
                            backgroundColor: 'green',
                            padding: '5px',
                            color: 'white',
                            borderRadius: '5px',
                          }}
                        >
                          <h3 style={{ margin: '0' }}>
                            {rating}
                            <Icon
                              icon="ph:star"
                              color="white"
                              width="14"
                              height="14"
                              style={{ marginLeft: '10px' }}
                            />
                          </h3>
                        </div>
                      </div>
                    </div>
                    <span>{comment}</span>
                  </p>
                  <hr />
                </>
              ),
            )}
          </div>
        </div>
      </div>
      {toggle && (
        <div>
          <Popup
            content={
              <div style={{ textAlign: 'left', color: 'white' }}>
                <h2>Add Your Review</h2>
                <div style={{ width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '10px',
                    }}
                  >
                    <label htmlFor="rating">Rating:</label>
                    <select
                      id="rating"
                      value={review.rating}
                      onChange={(event) =>
                        setReview({
                          ...review,
                          rating: Number(event.target.value),
                        })
                      }
                      style={{ padding: '5px', borderRadius: '5px' }}
                    >
                      <option value={0}>Select Rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '10px',
                    }}
                  >
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                      id="comment"
                      value={review.comment}
                      onChange={(event) =>
                        setReview({ ...review, comment: event.target.value })
                      }
                      style={{ borderRadius: '5px', padding: '10px' }}
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleAddReview();
                    setToggle(false);
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '10px 20px',
                    borderRadius: '5px ',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                  }}
                >
                  Submit
                </button>
              </div>
            }
            handleClose={() => setToggle(false)}
          />
        </div>
      )}
    </div>
  );
};
