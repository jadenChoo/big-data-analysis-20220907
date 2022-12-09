import pdb
import gym
import numpy as np

from tensorflow import keras
from tensorflow.keras import layers


def gather_data(env):
    min_score = 50
    scores = []
    state_history = []
    action_history = []

    for trial in range(10000):
        print('.', end='', flush=True)

        if (trial + 1) % 50 == 0:
            print(trial)

        score = 0
        states = []
        actions = []

        state = env.reset()

        while True:
            action = np.random.choice(2)

            one_hot_action = np.zeros(2)
            one_hot_action[action] = 1

            states.append(state)
            actions.append(one_hot_action)

            state, reward, done, _ = env.step(action)

            score += reward

            if done:
                break

        if score > min_score:
            scores.append(score)
            state_history += states
            action_history += actions

    state_history = np.array(state_history)
    action_history = np.array(action_history)

    print('Count: {}'.format(len(scores)))
    print('Average score: {:.2f}'.format(np.mean(scores)))

    return state_history, action_history


def create_model():
    inputs = layers.Input(shape=(4,))

    x = layers.Dense(128, activation='relu')(inputs)
    x = layers.Dropout(0.6)(x)

    x = layers.Dense(256, activation='relu')(x)
    x = layers.Dropout(0.6)(x)

    x = layers.Dense(512, activation='relu')(x)
    x = layers.Dropout(0.6)(x)

    x = layers.Dense(256, activation='relu')(x)
    x = layers.Dropout(0.6)(x)

    x = layers.Dense(128, activation='relu')(x)
    x = layers.Dropout(0.6)(x)

    outputs = layers.Dense(2, activation='softmax')(x)

    model = keras.Model(inputs=inputs, outputs=outputs)

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    return model


if __name__ == '__main__':
    print('Gathering data...')

    env = gym.make('CartPole-v1')
    state_history, action_history = gather_data(env)

    print('Training a deep-learning model...')

    model = create_model()
    model.fit(state_history, action_history, epochs=10)

    print('Test the AI')

    for trial in range(100):
        state = env.reset()
        score = 0

        while True:
            env.render()

            # action = np.random.choice(2)

            predicted = model.predict(state.reshape(1, 4))
            action = np.argmax(predicted)

            state, reward, done, _ = env.step(action)

            score += reward

            if done:
                break

        print(f'- Trial {trial}, score: {score}')

    print('** Completed!! **')
