from connection_common import connection_handler


@connection_handler
def get_boards(cursor):
    cursor.execute("""
        SELECT * FROM board """)
    return cursor.fetchall()


@connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
    SELECT * FROM card WHERE card.board_id = %(board_id)s
    """, {'board_id': board_id})
    return cursor.fetchall()


def get_latest_board_id():
    return get_boards()[-1['id']]

@connection_handler
def add_board(cursor):
    board_title = 'Board'+str(get_latest_board_id()[-1['id']]+1)
    cursor.execute("""
    INSERT INTO board(title) VALUES (%(board_title)s) 
    """, {'board_title': board_title})

