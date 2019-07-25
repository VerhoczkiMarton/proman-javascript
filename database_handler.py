from connection_common import connection_handler


@connection_handler
def get_boards(cursor):
    cursor.execute("""
        SELECT * FROM board """)
    return cursor.fetchall()


@connection_handler
def get_card_id(cursor):
    cursor.execute("""
    SELECT MAX(id)
    FROM card;
    """)
    try:
        return cursor.fetchone()['max']
    except:
        return 1


@connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
    SELECT * FROM card WHERE card.board_id = %(board_id)s
    """, {'board_id': board_id})
    return cursor.fetchall()


def get_latest_board_id():
    try:
        all_ = get_boards()
        last = all_[-1]
        latest_board_id = last['id']
    except:
        latest_board_id = 0
    return latest_board_id


@connection_handler
def add_board(cursor):
    board_title = 'Board'+str(get_latest_board_id()+1)
    cursor.execute("""
    INSERT INTO board(title) VALUES (%(board_title)s) 
    """, {'board_title': board_title})
    id = get_latest_board_id()
    return {'id': id}


@connection_handler
def add_card(cursor, boardId):
    id_ = get_card_id()
    card_title = f"Card {id_}"
    cursor.execute("""
    INSERT INTO card(title, progress, board_id) 
    VALUES (%(card_title)s, 0, %(board_id)s)
    """, {"card_title": card_title, "board_id": boardId})
    return {'id': id_, 'title': card_title}
