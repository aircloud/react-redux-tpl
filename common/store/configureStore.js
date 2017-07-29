
import pro from './configureStore.prod';
import dev from './configureStore.dev';
let construction ;

if (process.env.NODE_ENV === 'production') {
    construction = pro;
} else {
    construction = dev;
}

export default construction;