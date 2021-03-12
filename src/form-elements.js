// JS

import './assets/scss/utils/material-icons.css'
import './blocks/dropdown-list-value/dropdown-list-value.js'
import './blocks/datepicker/datepicker.js' // плагин календаря
import './blocks/maskedTextField/maskedTextField.js'
import './blocks/like-button/like-button.js' 
import './blocks/like-button/like-button.js' 
import './blocks/rate-button/rate-button.js' 
import './pages/form-elements/form-elements.scss' // когда поставил выеше всех, то сердечки в rate-button были размером, как указано в файле Material Icons

require('jquery-mask-plugin');
require('air-datepicker');



require.context('./blocks/', true, /\.(png|svg|jpg)$/); // ищет все картинки в src/blocks/ и импортирует в js, тем самым отпадает необходимость каждый раз делать запрос require для каждой картинки. НО при таком способе ошибки, якобы идет изменения одно и того же файла