<?php
    $to = ''; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = $_POST['subject'];
    $message = '
    <html>
        <head>
            <title>' . $subject . '</title>
        </head>
        <body>
            <h2>Заявка с формы: ' . $subject . '</h2>
            <p>Контактное лицо: ' . $_POST['name'] . '</p>
            <p>Сфера бизнеса: ' . $_POST['business'] . '</p>
            <p>Обород компании: ' . $_POST['inYear'] . '</p>
            <p>Личный доход: ' . $_POST['income'] . '</p>
            <p>E-mail: ' . $_POST['email'] . '</p>
            <p>Телефон: ' . $_POST['tel'] . '</p>
        </body>
    </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: club500 <info>\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {
        // echo 'success';
    } else {
        // echo 'error';
    }
?>
